import { Injectable } from '@nestjs/common';
import { IShopperRepository } from '../../repositories/ishopper.repository';
import { IBaseUseCase } from 'src/common/interfaces';

@Injectable()
export class ShopperFindWithProductsUseCase
  implements IBaseUseCase<any, string>
{
  constructor(private readonly shopperRepository: IShopperRepository) {}

  async execute(shopperId: string): Promise<any> {
    return this.shopperRepository.findShopperWithProducts(shopperId);
  }
}
