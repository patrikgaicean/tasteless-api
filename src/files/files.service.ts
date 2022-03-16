import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { ImagesRepository } from './images.repository';
import { Image } from './entities/image.entity';
import { ImageDto } from './dto/image.dto';

@Injectable()
export class FilesService {
  constructor(
    private imagesRepository: ImagesRepository,
    private configService: ConfigService
  ) {}

  async uploadImage(dataBuffer: Buffer, filename: string): Promise<ImageDto> {
    const s3 = new S3();

    const uploadResult = await s3.upload({
      Bucket: this.configService.get<string>('AWS_PRIVATE_BUCKET_NAME'),
      Body: dataBuffer,
      Key: `${uuid()}-${filename}`
    })
      .promise();
 
    const entity: Image = await this.imagesRepository.createImage({
      key: uploadResult.Key
    });

    return this.toDto(entity);
  }

  async uploadImages(files: Express.Multer.File[]): Promise<ImageDto[]> {
    return await Promise.all(files.map(async (file) => {
      return this.uploadImage(file.buffer, file.originalname);
    }));
  }

  toEntity(dto: ImageDto): Image {
    return {
      image_id: dto.imageId,
      key: dto.key
    }
  }

  toDto(entity: Image): ImageDto {
    return {
      imageId: entity.image_id,
      key: entity.key
    }
  }

}
