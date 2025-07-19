import { describe, it, expect, beforeEach, vi } from 'vitest';
import { EventAddShopperUseCase } from './add-shopper.use-case';
import { IEventRepository } from '../../repositories/ievent.repository';
import { EventEntity } from 'src/domain/entities';

describe('EventAddShopperUseCase', () => {
  let useCase: EventAddShopperUseCase;
  let mockEventRepository: any;

  beforeEach(() => {
    mockEventRepository = {
      addShopperToEvent: vi.fn(),
    };

    useCase = new EventAddShopperUseCase(mockEventRepository);
  });

  it('should add shopper to event successfully', async () => {
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

    mockEventRepository.addShopperToEvent.mockResolvedValue(expectedEvent);

    const result = await useCase.execute({ eventId, shopperId });

    expect(mockEventRepository.addShopperToEvent).toHaveBeenCalledWith(eventId, shopperId);
    expect(result).toEqual(expectedEvent);
  });
}); 
 