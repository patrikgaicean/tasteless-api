import { Inject, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository
  ) {}

  async findAll(): Promise<UserDto[]> {
    const entities: User[] = await this.usersRepository.findAll();

    return entities.map(e => this.toDto(e));
  }

  async findById(id: number) {
    const entity: User = await this.usersRepository.findById(id);

    return this.toDto(entity);
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }

  toDto(entity: User): UserDto {
    return {
      userId: entity.user_id,
      firstName: entity.first_name,
      lastName: entity.last_name,
      displayName: entity.display_name,
      email: entity.email
    }
  }
}
