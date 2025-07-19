import { describe, it, expect, beforeEach } from 'vitest';
import { EventInMemoryRepository } from '../../repositories/event.in-memory.repository';
import { EventFindAllUseCase } from './event-find-all.use-case';
import { randomUUID } from 'crypto';

let eventRepository: EventInMemoryRepository;
let eventFindAllUseCase: EventFindAllUseCase;

describe('EventFindAllUseCase', () => {
  beforeEach(() => {
    eventRepository = new EventInMemoryRepository();
    eventFindAllUseCase = new EventFindAllUseCase(eventRepository);
  });

  it('should be able to find all events', async () => {
    const event1 = await eventRepository.create({
      name: 'Event 1',
      description: 'Description 1',
      priceInCents: 10000,
      shopperId: randomUUID(),
    });

    const event2 = await eventRepository.create({
      name: 'Event 2',
      description: 'Description 2',
      priceInCents: 20000,
      shopperId: randomUUID(),
    });

    const result = await eventFindAllUseCase.execute();

    expect(result).toHaveLength(2);
    expect(result).toEqual([event1, event2]);
  });
});
