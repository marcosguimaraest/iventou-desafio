import { Injectable } from '@nestjs/common';
import { IEventRepository } from '../../repositories/ievent.repository';
import { EventEntity, UserEntity } from 'src/domain/entities';
import { IBaseUseCase } from 'src/common/interfaces';

@Injectable()
export class EventFindAllUseCase implements IBaseUseCase<EventEntity[], null> {
  constructor(private readonly eventRepository: IEventRepository) {}

  async execute(): Promise<EventEntity[]> {
    const event = await this.eventRepository.findAll();

    return event;
  }
}
