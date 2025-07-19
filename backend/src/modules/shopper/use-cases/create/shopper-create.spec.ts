import { describe, it, expect, beforeEach } from 'vitest';
import { ShopperInMemoryRepository } from '../../repositories/shopper.in-memory.repository';
import { ShopperCreateUseCase } from './shopper-create.use-case';
import { CreateShopperDto } from 'src/domain/dtos';

let shopperRepository: ShopperInMemoryRepository;
let shopperCreateUseCase: ShopperCreateUseCase;

describe('ShopperCreateUseCase', () => {
  beforeEach(() => {
    shopperRepository = new ShopperInMemoryRepository();
    shopperCreateUseCase = new ShopperCreateUseCase(shopperRepository);
  });

  it('should be able to create a new shopper', async () => {
    const createShopperDto: CreateShopperDto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    };

    const result = await shopperCreateUseCase.execute(createShopperDto);

    expect(result).toBeDefined();
    expect(result.id).toEqual(expect.any(String));
  });
});
