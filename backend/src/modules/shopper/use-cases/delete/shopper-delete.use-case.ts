import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/common/interfaces';
import { ResourceNotFoundError } from 'src/domain/errors/resource-not-found';
import { IShopperRepository } from '../../repositories/ishopper.repository';

@Injectable()
export class ShopperDeleteUseCase implements IBaseUseCase<void, string> {
  constructor(private readonly shopperRepository: IShopperRepository) {}

  async execute(id: string): Promise<void> {
    const shopper = await this.shopperRepository.findById(id);

    if (!shopper) {
      throw new ResourceNotFoundError();
    }

    await this.shopperRepository.delete(id);
  }
}
