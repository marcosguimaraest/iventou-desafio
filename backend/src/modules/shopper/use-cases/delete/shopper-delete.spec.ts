import { describe, it, expect, beforeEach } from 'vitest';
import { ShopperInMemoryRepository } from '../../repositories/shopper.in-memory.repository';
import { ShopperDeleteUseCase } from './shopper-delete.use-case';

let shopperRepository: ShopperInMemoryRepository;
let shopperDeleteUseCase: ShopperDeleteUseCase;

describe('ShopperDeleteUseCase', () => {
  beforeEach(() => {
    shopperRepository = new ShopperInMemoryRepository();
    shopperDeleteUseCase = new ShopperDeleteUseCase(shopperRepository);
  });

  it('should be able to delete a shopper', async () => {
    const shopper = await shopperRepository.create({
      name: 'Shopper 1',
      email: 'shopper1@example.com',
      password: '123456',
    });

    await shopperDeleteUseCase.execute(shopper.id);

    expect(shopperRepository.shopper).toHaveLength(0);
  });
});
