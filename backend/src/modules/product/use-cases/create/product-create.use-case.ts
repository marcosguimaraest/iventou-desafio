import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/common/interfaces';
import { CreateProductDto } from 'src/domain/dtos';
import { ProductEntity } from 'src/domain/entities';
import { IProductRepository } from '../../repositories/iproduct.repository';

@Injectable()
export class ProductCreateUseCase
  implements IBaseUseCase<ProductEntity, CreateProductDto>
{
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(data: CreateProductDto): Promise<ProductEntity> {
    const product = await this.productRepository.create({
      ...data,
    });

    return product;
  }
}
