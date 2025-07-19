import { Injectable } from '@nestjs/common';
import { ShopperEntity } from 'src/domain/entities';
import { IBaseUseCase } from 'src/common/interfaces';
import { IShopperRepository } from '../../repositories/ishopper.repository';

@Injectable()
export class ShopperFindAllUseCase
  implements IBaseUseCase<ShopperEntity[], null>
{
  constructor(private readonly shopperRepository: IShopperRepository) {}

  async execute(): Promise<ShopperEntity[]> {
    const shopper = await this.shopperRepository.findAll();

    return shopper;
  }
}
