import { describe, it, expect, beforeEach } from 'vitest';
import { ProductInMemoryRepository } from '../../repositories/product.in-memory.repository';
import { ProductDeleteUseCase } from './product-delete.use-case';
import { randomUUID } from 'crypto';

let productRepository: ProductInMemoryRepository;
let productDeleteUseCase: ProductDeleteUseCase;

describe('ProductDeleteUseCase', () => {
  beforeEach(() => {
    productRepository = new ProductInMemoryRepository();
    productDeleteUseCase = new ProductDeleteUseCase(productRepository);
  });

  it('should be able to delete a product', async () => {
    const product = await productRepository.create({
      name: 'Product 1',
      description: 'Description 1',
      priceInCents: 10000,
      shopperId: randomUUID(),
    });

    await productDeleteUseCase.execute(product.id);

    expect(productRepository.products).toHaveLength(0);
  });
});
