import { Injectable, NotFoundException } from '@nestjs/common';
import { FilesService } from '../files/files.service';
import { ProductsRepository } from '../products/products.repository';
import { DiscsRepository } from './discs.repository';
import { CreateDiscDto } from './dto/create-disc.dto';
import { DiscDto } from './dto/disc.dto';
import { Disc } from './entities/disc.entity';
import { bandNames } from './mock/bands';
import { albumNames } from './mock/albums';
import { createImage } from './mock/draw';
import { lorem } from './mock/lorem';
import { genreArray } from './dto/interfaces';
import { ProductsService } from '../products/products.service';
import { CreateProductDto } from '../products/dto/create-product.dto';
import { conditionArray } from '../products/dto/interfaces';
import { DiscQuery } from './dto/query';
import { RankingsRepository } from '../rankings/rankings.repository';

@Injectable()
export class DiscsService {
  constructor(
    private discsRepository: DiscsRepository,
    private productsRepository: ProductsRepository,
    private productsService: ProductsService,
    private filesService: FilesService,
    private rankingsRepository: RankingsRepository
  ) {}

  async getCatalog() {
    
  }

  async mockDiscs(no: number) {
    const bands = this.shuffle(bandNames);
    const albums = this.shuffle(albumNames);
    
    const payloads = [];
    const totalAlbums = albumNames.length;
    let currentAlbum = 0;
    let totalProducts = 0;

    console.log(no);

    bands.slice(0, no).forEach(band => {
      const albumNo = this.getRandomInt(1, 3);
      
      for (let i = 0; i < albumNo; i++) {
        if (currentAlbum === totalAlbums) {
          currentAlbum = 0;
        }

        const releaseDate = `${this.randomDate(new Date(1970, 0, 1), new Date())}`
        const trackList = [
          `A1 ${lorem.generateWords(this.getRandomInt(1, 3))}`,
          `A2 ${lorem.generateWords(this.getRandomInt(1, 3))}`,
          `A3 ${lorem.generateWords(this.getRandomInt(1, 3))}`,
          `A4 ${lorem.generateWords(this.getRandomInt(1, 3))}`,
          `B1 ${lorem.generateWords(this.getRandomInt(1, 3))}`,
          `B2 ${lorem.generateWords(this.getRandomInt(1, 3))}`,
          `B3 ${lorem.generateWords(this.getRandomInt(1, 3))}`,
          `B4 ${lorem.generateWords(this.getRandomInt(1, 3))}`,
        ]

        payloads.push({
          title: albums[currentAlbum++],
          artist: band,
          releaseDate,
          genre: genreArray[Math.floor(Math.random() * genreArray.length)],
          description: lorem.generateSentences(this.getRandomInt(3, 6)),
          trackList
        } as CreateDiscDto)
      }
    })

    const payloadsWithImages = payloads.map(payload => {
      return {
        ...payload,
        imageBuffer: createImage()
      }
    })

    await Promise.all(payloadsWithImages.map(async (p) => {
      // create disc
      const { disc_id } = await this.discsRepository.createDisc(this.toEntity(p));

      // add image for disc
      await this.filesService.uploadImage(
        p.imageBuffer,
        `${this.getRandomInt(1, 100)}${lorem.generateWords(1)}${this.getRandomInt(1, 120)}`,
        disc_id,
        'disc',
        true
      )

      // add products to disc
      const productNo = this.getRandomInt(0, 7);
      const productPayload = [];

      for (let i = 0; i < productNo; i++) {
        productPayload.push({
          discId: disc_id,
          condition: conditionArray[Math.floor(Math.random() * conditionArray.length)],
          price: this.getRandomFloat(10, 60)
        } as CreateProductDto)
      }

      totalProducts += productPayload.length;

      Promise.all(productPayload.map(async (pp) => {
        await this.productsService.create(pp);
      }))
    }))

    return { message: `Created ${payloads.length} discs with a total of ${totalProducts} products.`}
  }

  async create(data: CreateDiscDto) {
    const entity: Disc = await this.discsRepository.createDisc(this.toEntity(data));

    return this.toDto(entity);
  }

  async uploadImages(discId: number, files: Express.Multer.File[]) {
    await this.filesService.uploadImages(files, discId, 'disc');
  }

  async getDiscImages(discId: number) {
    const discWithImages: Disc = await this.discsRepository.findDiscWithImages(discId);

    if (discWithImages) {
      return Promise.all(
        discWithImages.images.map(async (image) => {
          const url = await this.filesService.generatePresignedUrl(image.key);
          return {
            ...image,
            url
          }
        })
      )
    }

    throw new NotFoundException('User with this id does not exist');
  }

  async findAll(query: DiscQuery) {
    const entities: Disc[] = await this.discsRepository.findAll(query);

    return Promise.all(
      entities.map(async (e) => {
        const dto = this.toDto(e);
        const { lowestPrice, productId } = await this.productsRepository.findLowestPrice(e.disc_id);
        const ranking = await this.rankingsRepository.findDiscAverageRanking(e.disc_id);

        return {
          discId: dto.discId, 
          title: dto.title,
          artist: dto.artist,
          images: (await this.getDiscImages(e.disc_id)).map(img => {
            return {
              url: img.url,
              main: img.main
            }
          }),
          lowestPrice,
          productId,
          ranking
        }
      })
    )
  }

  async findOne(discId: number, details: boolean = true) {
    const entity: Disc = await this.discsRepository.findById(discId);
    const images = await this.getDiscImages(entity.disc_id);
    const { lowestPrice, productId } = await this.productsRepository.findLowestPrice(entity.disc_id);

    let disc = {}
    if (details) {
      disc = this.toDto(entity);
    } else {
      disc = {
        discId: entity.disc_id,
        title: entity.title,
        artist: entity.artist
      }
    }

    return {
      ...disc,
      images: images.map(img => ({ url: img.url, main: img.main})),
      lowestPrice,
      productId
    }
  }

  async getGenres() {
    return await this.discsRepository.getGenres();
  }

  toEntity(dto: DiscDto): Disc {
    return {
      title: dto.title,
      artist: dto.artist,
      release_date: new Date(dto.releaseDate),
      genre: dto.genre,
      description: dto.description,
      track_list: dto.trackList
    }
  }

  toDto(entity: Disc): DiscDto {
    return {
      discId: entity.disc_id,
      title: entity.title,
      artist: entity.artist,
      releaseDate: `${entity.release_date}`,
      genre: entity.genre,
      description: entity.description,
      trackList: entity.track_list
    }
  }

  private getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  private getRandomFloat(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Number((Math.random() * (max - min) + min).toFixed(2)); //The maximum is exclusive and the minimum is inclusive
  }

  private randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
  
  private shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
}
