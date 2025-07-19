import { Injectable } from '@nestjs/common';
import { IProductRepository } from '../../repositories/iproduct.repository';
import { IBaseUseCase } from 'src/common/interfaces';
import { ResourceNotFoundError } from 'src/domain/errors/resource-not-found';

@Injectable()
export class ProductDeleteUseCase implements IBaseUseCase<void, string> {
  constructor(
    private readonly productRepository: IProductRepository
  ) {}

  async execute(id: string): Promise<void> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new ResourceNotFoundError();
    }

    await this.productRepository.delete(id);
  }
}
