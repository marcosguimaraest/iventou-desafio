import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/common/interfaces';
import { CreateEventDto } from 'src/domain/dtos';
import { EventEntity } from 'src/domain/entities';
import { IEventRepository } from '../../repositories/ievent.repository';

@Injectable()
export class EventCreateUseCase
  implements IBaseUseCase<EventEntity, CreateEventDto>
{
  constructor(private readonly eventRepository: IEventRepository) {}

  async execute(data: CreateEventDto): Promise<EventEntity> {
    const event = await this.eventRepository.create({
      ...data,
    });

    return event;
  }
}
