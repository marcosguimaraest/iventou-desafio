import { describe, it, expect, beforeEach } from 'vitest';
import { ProductInMemoryRepository } from '../../repositories/product.in-memory.repository';
import { ProductFindAllUseCase } from './product-find-all.use-case';
import { randomUUID } from 'crypto';

let productRepository: ProductInMemoryRepository;
let productFindAllUseCase: ProductFindAllUseCase;

describe('ProductFindAllUseCase', () => {
  beforeEach(() => {
    productRepository = new ProductInMemoryRepository();
    productFindAllUseCase = new ProductFindAllUseCase(productRepository);
  });

  it('should be able to find all products', async () => {
    const product1 = await productRepository.create({
      name: 'Product 1',
      description: 'Description 1',
      priceInCents: 10000,
      shopperId: randomUUID(),
    });

    const product2 = await productRepository.create({
      name: 'Product 2',
      description: 'Description 2',
      priceInCents: 20000,
      shopperId: randomUUID(),
    });

    const result = await productFindAllUseCase.execute();

    expect(result).toHaveLength(2);
    expect(result).toEqual([product1, product2]);
  });
});
