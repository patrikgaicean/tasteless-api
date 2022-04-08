import { Injectable } from '@nestjs/common';
import { AddressesRepository } from './addresses.repository';
import { AddressDto } from './dto/address.dto';
import { CreateAddressDto } from './dto/create-address.dto';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressesService {

  constructor(
    private addressesRepository: AddressesRepository,
  ) {}

  async create(createAddressDto: CreateAddressDto, userId: number) {
    console.log('dto', createAddressDto)
    const entity: Address = await this.addressesRepository.createAddress(
      this.toEntity({ userId, ...createAddressDto })
    );

    return this.toDto(entity);
  }

  async findAllForUser(userId: number) {
    const entities: Address[] = await this.addressesRepository.findAllForUser(userId);

    return entities.map(e => this.toDto(e));
  }

  async removeForUser(id: number, userId: number) {
    return await this.addressesRepository.removeForUser(id, userId);
  }

  toEntity(dto: AddressDto): Address {
    return {
      address_id: dto.addressId,
      user_id: dto.userId,
      first_name: dto.firstName,
      last_name: dto.lastName,
      street: dto.street,
      street_number: dto.streetNumber,
      postal_code: dto.postalCode,
      city: dto.city,
      country: dto.country,
      telephone: dto.telephone
    }
  }

  toDto(entity: Address): AddressDto {
    return {
      addressId: entity.address_id,
      userId: entity.user_id,
      firstName: entity.first_name,
      lastName: entity.last_name,
      street: entity.street,
      streetNumber: entity.street_number,
      postalCode: entity.postal_code,
      city: entity.city,
      country: entity.country,
      telephone: entity.telephone
    }
  }

}
