import { Injectable } from '@nestjs/common';
import { ShopperEntity } from 'src/domain/entities';
import { IBaseUseCase } from 'src/common/interfaces';
import { ResourceNotFoundError } from 'src/domain/errors/resource-not-found';
import { IShopperRepository } from '../../repositories/ishopper.repository';

@Injectable()
export class ShopperFindOneByIdUseCase
  implements IBaseUseCase<ShopperEntity, string>
{
  constructor(private readonly shopperRepository: IShopperRepository) {}

  async execute(id: string): Promise<ShopperEntity> {
    const shopper = await this.shopperRepository.findById(id);

    if (!shopper) {
      throw new ResourceNotFoundError();
    }

    return shopper;
  }
}
