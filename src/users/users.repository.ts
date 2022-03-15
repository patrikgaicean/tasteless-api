import { HttpException } from "@nestjs/common";
import {EntityRepository, Repository} from "typeorm";
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

  async findById(id: number): Promise<User> {
    const entity: User = await this.findOne({ user_id: id })

    if (!entity) {
      throw new HttpException(`User with email ${id} not found`, 404);
    }

    const { password, ...user } = entity;

    return user;
  }

  async createUser(userData: User): Promise<User> {
    const entity: User = this.create(userData);

    await this.save(entity);

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
