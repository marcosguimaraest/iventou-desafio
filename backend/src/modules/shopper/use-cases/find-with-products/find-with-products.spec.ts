import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ShopperFindWithProductsUseCase } from './find-with-products.use-case';
import { IShopperRepository } from '../../repositories/ishopper.repository';

describe('ShopperFindWithProductsUseCase', () => {
  let useCase: ShopperFindWithProductsUseCase;
  let mockShopperRepository: any;

  beforeEach(() => {
    mockShopperRepository = {
      findShopperWithProducts: vi.fn(),
    };

    useCase = new ShopperFindWithProductsUseCase(mockShopperRepository);
  });

  it('should find shopper with products successfully', async () => {
    const shopperId = 'shopper-123';
    const expectedShopper = {
      id: shopperId,
      name: 'McDonald\'s',
      email: 'mcdonalds@test.com',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date(),
      products: [
        {
          id: 'product-1',
          name: 'Big Mac',
          description: 'Hambúrguer clássico',
          priceInCents: 2500,
          createdAt: new Date(),
          updatedAt: new Date(),
          shopperId: shopperId,
        },
        {
          id: 'product-2',
          name: 'McChicken',
          description: 'Sanduíche de frango',
          priceInCents: 2000,
          createdAt: new Date(),
          updatedAt: new Date(),
          shopperId: shopperId,
        },
      ],
    };

    mockShopperRepository.findShopperWithProducts.mockResolvedValue(expectedShopper);

    const result = await useCase.execute(shopperId);

    expect(mockShopperRepository.findShopperWithProducts).toHaveBeenCalledWith(shopperId);
    expect(result).toEqual(expectedShopper);
  });
}); 
