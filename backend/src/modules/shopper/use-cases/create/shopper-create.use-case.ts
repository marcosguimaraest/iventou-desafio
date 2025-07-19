import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { IBaseUseCase } from 'src/common/interfaces';
import { CreateShopperDto } from 'src/domain/dtos';
import { EmailAlreadyExistsError } from 'src/domain/errors/email-already-exists';
import { ShopperEntity } from 'src/domain/entities';
import { IShopperRepository } from '../../repositories/ishopper.repository';

@Injectable()
export class ShopperCreateUseCase
  implements IBaseUseCase<ShopperEntity, CreateShopperDto>
{
  constructor(private readonly shopperRepository: IShopperRepository) {}

  async execute(data: CreateShopperDto): Promise<ShopperEntity> {
    const emailAlreadyExists = await this.shopperRepository.findByEmail(
      data.email,
    );

    if (emailAlreadyExists) {
      throw new EmailAlreadyExistsError();
    }

    const hash = await bcrypt.hash(data.password, 6);

    const shopper = await this.shopperRepository.create({
      ...data,
      password: hash,
    });

    return shopper;
  }
}
