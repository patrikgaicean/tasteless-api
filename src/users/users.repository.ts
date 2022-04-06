import { HttpException, HttpStatus } from "@nestjs/common";
import {EntityRepository, Repository} from "typeorm";
import PostgresErrorCode from "../database/postgresErrorCode.enum";
import { User } from "./entities/user.entity";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {

  async findAll(): Promise<User[]> {
    const entities: User[] = await this.find();

    return entities.map(e => {
      const { password, ...user } = e;
      return user;
    })
  }

  async findById(user_id: number): Promise<User> {
    const entity: User = await this.findOne({ user_id })

    if (!entity) {
      throw new HttpException(`User with email ${user_id} not found`, 404);
    }

    const { password, ...user } = entity;

    return user;
  }

  async createUser(data: User): Promise<User> {
    const entity: User = this.create(data);
    
    try {
      await this.save(entity);
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    const { password, ...user } = entity;
    
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const entity: User = await this.findOne({ email });

    if (!entity) {
      throw new HttpException(`User with email ${email} not found`, 404);
    }

    return entity;
  }
}
