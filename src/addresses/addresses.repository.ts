import { HttpException, HttpStatus } from "@nestjs/common";
import {EntityRepository, Repository} from "typeorm";
import { Address } from "./entities/address.entity";

@EntityRepository(Address)
export class AddressesRepository extends Repository<Address> {

  async createAddress(data: Address): Promise<Address> {
    console.log(data);
    const entity: Address = this.create(data);

    try {
      await this.save(entity);
    } catch (error) {
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return entity;
  }

  async findAllForUser(user_id: number): Promise<Address[]> {
    return await this.createQueryBuilder('address')
      .where(`user_id = :id`, { id: user_id })
      .getMany();
  }

  async removeForUser(address_id: number, user_id: number) {
    return await this.delete({ address_id, user_id });
  }
}
