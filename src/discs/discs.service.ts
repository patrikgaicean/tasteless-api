import { Injectable } from '@nestjs/common';
import { CreateDiscDto } from './dto/create-disc.dto';
import { UpdateDiscDto } from './dto/update-disc.dto';

@Injectable()
export class DiscsService {
  create(createDiscDto: CreateDiscDto) {
    return 'This action adds a new disc';
  }

  findAll() {
    return `This action returns all discs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} disc`;
  }

  update(id: number, updateDiscDto: UpdateDiscDto) {
    return `This action updates a #${id} disc`;
  }

  remove(id: number) {
    return `This action removes a #${id} disc`;
  }
}
