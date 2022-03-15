import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { ImagesRepository } from './images.repository';

@Injectable()
export class FilesService {
  constructor(
    private imagesRepository: ImagesRepository,
    private configService: ConfigService
  ) {}

  async uploadImage(dataBuffer: Buffer, filename: string) {
    const s3 = new S3();

    const uploadResult = await s3.upload({
      Bucket: this.configService.get<string>('AWS_PRIVATE_BUCKET_NAME'),
      Body: dataBuffer,
      Key: `${uuid()}-${filename}`
    })
      .promise();
 
    const newFile = await this.imagesRepository.createImage({
      key: uploadResult.Key
    });

    return newFile;
  }
}
