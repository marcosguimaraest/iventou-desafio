import { describe, it, expect, beforeEach, vi } from 'vitest';
import { EventRemoveShopperUseCase } from './remove-shopper.use-case';
import { IEventRepository } from '../../repositories/ievent.repository';

describe('EventRemoveShopperUseCase', () => {
  let useCase: EventRemoveShopperUseCase;
  let mockEventRepository: any;

  beforeEach(() => {
    mockEventRepository = {
      removeShopperFromEvent: vi.fn(),
    };

    useCase = new EventRemoveShopperUseCase(mockEventRepository);
  });

  it('should remove shopper from event successfully', async () => {
    const eventId = 'event-123';
    const shopperId = 'shopper-456';
    const expectedEvent = {
      id: eventId,
      name: 'Test Event',
      description: 'Test Description',
      createdAt: new Date(),
      updatedAt: new Date(),
      ownerId: 'owner-123',
    };

    mockEventRepository.removeShopperFromEvent.mockResolvedValue(expectedEvent);

    const result = await useCase.execute({ eventId, shopperId });

    expect(mockEventRepository.removeShopperFromEvent).toHaveBeenCalledWith(eventId, shopperId);
    expect(result).toEqual(expectedEvent);
  });
}); 
