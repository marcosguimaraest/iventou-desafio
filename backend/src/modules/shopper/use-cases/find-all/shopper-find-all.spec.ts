import { describe, it, expect, beforeEach } from 'vitest';
import { ShopperInMemoryRepository } from '../../repositories/shopper.in-memory.repository';
import { ShopperFindAllUseCase } from './shopper-find-all.use-case';

let shopperRepository: ShopperInMemoryRepository;
let shopperFindAllUseCase: ShopperFindAllUseCase;

describe('ShopperFindAllUseCase', () => {
  beforeEach(() => {
    shopperRepository = new ShopperInMemoryRepository();
    shopperFindAllUseCase = new ShopperFindAllUseCase(shopperRepository);
  });

  it('should be able to find all products', async () => {
    const shopper1 = await shopperRepository.create({
      name: 'Shopper 1',
      email: 'shopper1@example.com',
      password: '123456',
    });

    const shopper2 = await shopperRepository.create({
      name: 'Shopper 2',
      email: 'shopper2@example.com',
      password: '123456',
    });

    const result = await shopperFindAllUseCase.execute();

    expect(result).toHaveLength(2);
    expect(result).toEqual([shopper1, shopper2]);
  });
});
