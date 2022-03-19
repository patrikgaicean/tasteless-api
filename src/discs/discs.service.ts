import { Injectable, NotFoundException } from '@nestjs/common';
import { ImageDto } from '../files/dto/image.dto';
import { FilesService } from '../files/files.service';
import { DiscsRepository } from './discs.repository';
import { CreateDiscDto } from './dto/create-disc.dto';
import { DiscDto } from './dto/disc.dto';
import { Disc } from './entities/disc.entity';

@Injectable()
export class DiscsService {
  constructor(
    private discsRepository: DiscsRepository,
    private filesService: FilesService
  ) {}

  async create(discData: CreateDiscDto) {
    const entity: Disc = await this.discsRepository.createDisc(this.toEntity(discData));

    return this.toDto(entity);
  }

  async uploadImages(discId: number, files: Express.Multer.File[]) {
    await this.filesService.uploadImages(files, discId, 'disc');
  }

  async getDiscImages(discId: number) {
    const discWithImages = await this.discsRepository.findOne(
      { disc_id: discId },
      { relations: ['images'] }
    );

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

  async findAll() {
    const entities: Disc[] = await this.discsRepository.findAll();

    return entities.map(e => this.toDto(e));
  }

  async findOne(id: number) {
    const entity: Disc = await this.discsRepository.findById(id);

    return this.toDto(entity);
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
}
