import { Injectable } from '@nestjs/common';
import { IEventRepository } from '../../repositories/ievent.repository';
import { EventEntity } from 'src/domain/entities';
import { IBaseUseCase } from 'src/common/interfaces';
import { ResourceNotFoundError } from 'src/domain/errors/resource-not-found';

@Injectable()
export class EventFindOneByIdUseCase
  implements IBaseUseCase<EventEntity, string>
{
  constructor(private readonly eventRepository: IEventRepository) {}

  async execute(id: string): Promise<EventEntity> {
    const event = await this.eventRepository.findById(id);

    if (!event) {
      throw new ResourceNotFoundError();
    }

    return event;
  }
}
