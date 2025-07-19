import { describe, it, expect, beforeEach } from 'vitest';
import { ProductInMemoryRepository } from '../../repositories/product.in-memory.repository';
import { ProductFindOneByIdUseCase } from './product-find-one-by-id.use-case';
import { randomUUID } from 'crypto';

let productRepository: ProductInMemoryRepository;
let productFindOneByIdUseCase: ProductFindOneByIdUseCase;

describe('ProductFindOneByIdUseCase', () => {
  beforeEach(() => {
    productRepository = new ProductInMemoryRepository();
    productFindOneByIdUseCase = new ProductFindOneByIdUseCase(
      productRepository,
    );
  });

  it('should be able to find a product by id', async () => {
    const product = await productRepository.create({
      name: 'Product 1',
      description: 'Description 1',
      priceInCents: 10000,
      shopperId: randomUUID(),
    });

    const result = await productFindOneByIdUseCase.execute(product.id);

    expect(result).toEqual(product);
  });
});
