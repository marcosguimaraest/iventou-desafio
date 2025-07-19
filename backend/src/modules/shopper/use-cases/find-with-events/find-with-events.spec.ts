import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ShopperFindWithEventsUseCase } from './find-with-events.use-case';
import { IShopperRepository } from '../../repositories/ishopper.repository';

describe('ShopperFindWithEventsUseCase', () => {
  let useCase: ShopperFindWithEventsUseCase;
  let mockShopperRepository: any;

  beforeEach(() => {
    mockShopperRepository = {
      findShopperWithEvents: vi.fn(),
    };

    useCase = new ShopperFindWithEventsUseCase(mockShopperRepository);
  });

  it('should find shopper with events successfully', async () => {
    const shopperId = 'shopper-123';
    const expectedShopper = {
      id: shopperId,
      name: "McDonald's",
      email: 'mcdonalds@test.com',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date(),
      events: [
        {
          id: 'event-1',
          name: 'Festival de Comida',
          description: 'Festival gastronômico',
          createdAt: new Date(),
          updatedAt: new Date(),
          ownerId: 'owner-123',
        },
        {
          id: 'event-2',
          name: 'Feira de Rua',
          description: 'Feira de rua tradicional',
          createdAt: new Date(),
          updatedAt: new Date(),
          ownerId: 'owner-456',
        },
      ],
    };

    mockShopperRepository.findShopperWithEvents.mockResolvedValue(
      expectedShopper,
    );

    const result = await useCase.execute(shopperId);

    expect(mockShopperRepository.findShopperWithEvents).toHaveBeenCalledWith(
      shopperId,
    );
    expect(result).toEqual(expectedShopper);
  });
});
