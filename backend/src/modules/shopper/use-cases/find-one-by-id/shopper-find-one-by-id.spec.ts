import { describe, it, expect, beforeEach } from 'vitest';
import { ShopperInMemoryRepository } from '../../repositories/shopper.in-memory.repository';
import { ShopperFindOneByIdUseCase } from './shopper-find-one-by-id.use-case';

let shopperRepository: ShopperInMemoryRepository;
let shopperFindOneByIdUseCase: ShopperFindOneByIdUseCase;

describe('ShopperFindOneByIdUseCase', () => {
  beforeEach(() => {
    shopperRepository = new ShopperInMemoryRepository();
    shopperFindOneByIdUseCase = new ShopperFindOneByIdUseCase(
      shopperRepository,
    );
  });

  it('should be able to find a shopper by id', async () => {
    const shopper = await shopperRepository.create({
      name: 'Shopper 1',
      email: 'shopper1@example.com',
      password: '123456',
    });

    const result = await shopperFindOneByIdUseCase.execute(shopper.id);

    expect(result).toEqual(shopper);
  });
});
