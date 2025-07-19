import { describe, it, expect, beforeEach } from 'vitest';
import { ProductInMemoryRepository } from '../../repositories/product.in-memory.repository';
import { ProductCreateUseCase } from './product-create.use-case';
import { CreateProductDto } from 'src/domain/dtos';
import { randomUUID } from 'crypto';

let productRepository: ProductInMemoryRepository;
let productCreateUseCase: ProductCreateUseCase;

describe('ProductCreateUseCase', () => {
  beforeEach(() => {
    productRepository = new ProductInMemoryRepository();
    productCreateUseCase = new ProductCreateUseCase(productRepository);
  });

  it('should be able to create a new product', async () => {
    const createProductDto: CreateProductDto = {
      shopperId: randomUUID(),
      name: 'Product 1',
      description: 'Description 1',
      priceInCents: 10000,
    };

    const result = await productCreateUseCase.execute(createProductDto);

    expect(result).toBeDefined();
    expect(result.id).toEqual(expect.any(String));
  });
});
