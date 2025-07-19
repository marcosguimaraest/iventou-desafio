import { Injectable } from '@nestjs/common';
import { IProductRepository } from '../../repositories/iproduct.repository';
import { ProductEntity } from 'src/domain/entities';
import { IBaseUseCase } from 'src/common/interfaces';
import { ResourceNotFoundError } from 'src/domain/errors/resource-not-found';

@Injectable()
export class ProductFindOneByIdUseCase
  implements IBaseUseCase<ProductEntity, string>
{
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(id: string): Promise<ProductEntity> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new ResourceNotFoundError();
    }

    return product;
  }
}
