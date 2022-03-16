import { Injectable } from '@nestjs/common';
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
    const entity: Disc = await this.discsRepository.createDisc({
      title: discData.title,
      artist: discData.artist,
      release_date: new Date(discData.releaseDate),
      genre: discData.genre,
      description: discData.description,
      track_list: discData.trackList
    });

    return this.toDto(entity);
  }

  async uploadImages(discId: number, files: Express.Multer.File[]) {
    const images: ImageDto[] = await this.filesService.uploadImages(files);

    await this.discsRepository.addImages(discId, images.map(img => img.imageId));

    return;
  }

  async findAll() {
    const entities: Disc[] = await this.discsRepository.findAll();

    return entities.map(e => this.toDto(e));
  }

  async findOne(id: number) {
    const entity: Disc = await this.discsRepository.findById(id);

    return this.toDto(entity);
  }

  async remove(id: number) {
    return `This action removes a #${id} disc`;
  }

  toEntity(dto: DiscDto): Disc {
    return {
      title: dto.title,
      artist: dto.artist,
      release_date: new Date(dto.releaseDate),
      genre: dto.genre,
      description: dto.description,
      track_list: dto.trackList,
      images: dto.images
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
      trackList: entity.track_list,
      images: entity.images
    }
  }
}
