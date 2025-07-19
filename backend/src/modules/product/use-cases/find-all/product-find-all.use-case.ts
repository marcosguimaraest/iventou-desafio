import { Injectable } from '@nestjs/common';
import { IProductRepository } from '../../repositories/iproduct.repository';
import { ProductEntity, UserEntity } from 'src/domain/entities';
import { IBaseUseCase } from 'src/common/interfaces';

@Injectable()
export class ProductFindAllUseCase
  implements IBaseUseCase<ProductEntity[], null>
{
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(): Promise<ProductEntity[]> {
    const product = await this.productRepository.findAll();

    return product;
  }
}
