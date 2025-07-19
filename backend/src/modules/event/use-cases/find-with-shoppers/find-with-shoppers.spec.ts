import { describe, it, expect, beforeEach, vi } from 'vitest';
import { EventFindWithShoppersUseCase } from './find-with-shoppers.use-case';
import { IEventRepository } from '../../repositories/ievent.repository';

describe('EventFindWithShoppersUseCase', () => {
  let useCase: EventFindWithShoppersUseCase;
  let mockEventRepository: any;

  beforeEach(() => {
    mockEventRepository = {
      findEventWithShoppers: vi.fn(),
    };

    useCase = new EventFindWithShoppersUseCase(mockEventRepository);
  });

  it('should find event with shoppers successfully', async () => {
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
        },
      ],
    };

    mockEventRepository.findEventWithShoppers.mockResolvedValue(expectedEvent);

    const result = await useCase.execute(eventId);

    expect(mockEventRepository.findEventWithShoppers).toHaveBeenCalledWith(eventId);
    expect(result).toEqual(expectedEvent);
  });
}); 
