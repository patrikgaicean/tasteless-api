import { Injectable } from '@nestjs/common';
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

  async uploadImage(imageBuffer: Buffer, filename: string) {
    return this.filesService.uploadImage(imageBuffer, filename);
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
