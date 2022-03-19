import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { ImageDto } from './dto/image.dto';
import { DiscImagesRepository } from './disc-images.repository';
import { ProductImagesRepository } from './product-images.repository';

@Injectable()
export class FilesService {
  constructor(
    private discImagesRepository: DiscImagesRepository,
    private productImagesRepository: ProductImagesRepository,
    private configService: ConfigService
  ) {}

  async uploadImage(dataBuffer: Buffer, filename: string, ownerId: number, destination: string) { // TODO change to enum
    const s3 = new S3();
    const uploadResult = await s3.upload({
      Bucket: this.configService.get('AWS_PRIVATE_BUCKET_NAME'),
      Body: dataBuffer,
      Key: `${uuid()}-${filename}`
    })
      .promise();

    switch (destination) {
      case 'disc': {
        return await this.discImagesRepository.createImage({
          key: uploadResult.Key,
          owner: {
            disc_id: ownerId
          } as any
        });
      }

      case 'product': {
        return await this.productImagesRepository.createImage({
          key: uploadResult.Key,
          owner: {
            product_id: ownerId
          } as any
        });
      }
    }
  }

  async uploadImages(files: Express.Multer.File[], discId: number, destination: string): Promise<ImageDto[]> {
    return await Promise.all(files.map(async (file) => {
      return this.uploadImage(file.buffer, file.originalname, discId, destination);
    }));
  }

  async generatePresignedUrl(key: string) {
    const s3 = new S3();
 
    return s3.getSignedUrlPromise('getObject', {
      Bucket: this.configService.get('AWS_PRIVATE_BUCKET_NAME'),
      Key: key
    })
  }
  
}
