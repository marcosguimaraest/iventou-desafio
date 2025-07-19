import { Injectable } from '@nestjs/common';
import { IEventRepository } from '../../repositories/ievent.repository';
import { IBaseUseCase } from 'src/common/interfaces';
import { EventEntity } from 'src/domain/entities';

interface AddShopperToEventDto {
  eventId: string;
  shopperId: string;
}

@Injectable()
export class EventAddShopperUseCase
  implements IBaseUseCase<EventEntity, AddShopperToEventDto>
{
  constructor(private readonly eventRepository: IEventRepository) {}

  async execute(dto: AddShopperToEventDto): Promise<EventEntity> {
    return this.eventRepository.addShopperToEvent(dto.eventId, dto.shopperId);
  }
} 
 