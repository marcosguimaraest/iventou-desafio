import { describe, it, expect, beforeEach } from 'vitest';
import { randomUUID } from 'crypto';
import { EventInMemoryRepository } from '../../repositories/event.in-memory.repository';
import { EventFindOneByIdUseCase } from './event-find-one-by-id.use-case';

let eventRepository: EventInMemoryRepository;
let eventFindOneByIdUseCase: EventFindOneByIdUseCase;

describe('eventFindOneByIdUseCase', () => {
  beforeEach(() => {
    eventRepository = new EventInMemoryRepository();
    eventFindOneByIdUseCase = new EventFindOneByIdUseCase(eventRepository);
  });

  it('should be able to find a event by id', async () => {
    const event = await eventRepository.create({
      name: 'event 1',
      description: 'Description 1',
      priceInCents: 10000,
      shopperId: randomUUID(),
    });

    const result = await eventFindOneByIdUseCase.execute(event.id);

    expect(result).toEqual(event);
  });
});
