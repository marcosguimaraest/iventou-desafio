import { describe, it, expect, beforeEach, vi } from 'vitest';
import { EventFindWithShoppersAndProductsUseCase } from './find-with-shoppers-and-products.use-case';
import { IEventRepository } from '../../repositories/ievent.repository';

describe('EventFindWithShoppersAndProductsUseCase', () => {
  let useCase: EventFindWithShoppersAndProductsUseCase;
  let mockEventRepository: any;

  beforeEach(() => {
    mockEventRepository = {
      findEventWithShoppersAndProducts: vi.fn(),
    };

    useCase = new EventFindWithShoppersAndProductsUseCase(mockEventRepository);
  });

  it('should find event with shoppers and products successfully', async () => {
    const eventId = 'event-123';
    const expectedEvent = {
      id: eventId,
      name: 'Test Event',
      description: 'Test Description',
      createdAt: new Date(),
      updatedAt: new Date(),
      ownerId: 'owner-123',
      shoppers: [
        {
          id: 'shopper-1',
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
              shopperId: 'shopper-1',
            },
          ],
        },
      ],
    };

    mockEventRepository.findEventWithShoppersAndProducts.mockResolvedValue(expectedEvent);

    const result = await useCase.execute(eventId);

    expect(mockEventRepository.findEventWithShoppersAndProducts).toHaveBeenCalledWith(eventId);
    expect(result).toEqual(expectedEvent);
  });
}); 
