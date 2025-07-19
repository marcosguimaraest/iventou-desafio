import { describe, it, expect, beforeEach } from 'vitest';
import { EventInMemoryRepository } from '../../repositories/event.in-memory.repository';
import { EventDeleteUseCase } from './event-delete.use-case';
import { randomUUID } from 'crypto';

let eventRepository: EventInMemoryRepository;
let eventDeleteUseCase: EventDeleteUseCase;

describe('EventDeleteUseCase', () => {
  beforeEach(() => {
    eventRepository = new EventInMemoryRepository();
    eventDeleteUseCase = new EventDeleteUseCase(eventRepository);
  });

  it('should be able to delete a event', async () => {
    const event = await eventRepository.create({
      name: 'Event 1',
      description: 'Description 1',
      priceInCents: 10000,
      shopperId: randomUUID(),
    });

    await eventDeleteUseCase.execute(event.id);

    expect(eventRepository.events).toHaveLength(0);
  });
});
