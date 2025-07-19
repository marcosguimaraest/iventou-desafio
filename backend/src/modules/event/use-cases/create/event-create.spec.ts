import { describe, it, expect, beforeEach } from 'vitest';
import { EventInMemoryRepository } from '../../repositories/event.in-memory.repository';
import { EventCreateUseCase } from './event-create.use-case';
import { CreateEventDto } from 'src/domain/dtos';
import { randomUUID } from 'node:crypto';

let eventRepository: EventInMemoryRepository;
let eventCreateUseCase: EventCreateUseCase;

describe('EventCreateUseCase', () => {
  beforeEach(() => {
    eventRepository = new EventInMemoryRepository();
    eventCreateUseCase = new EventCreateUseCase(eventRepository);
  });

  it('should be able to create a new event', async () => {
    const createEventDto: CreateEventDto = {
      name: 'John Doe',
      description: 'asdwasd',
      eventOwnerId: randomUUID(),
    };

    const result = await eventCreateUseCase.execute(createEventDto);

    expect(result).toBeDefined();
    expect(result.id).toEqual(expect.any(String));
  });
});
