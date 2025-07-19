import { Injectable } from '@nestjs/common';
import { IEventRepository } from '../../repositories/ievent.repository';
import { IBaseUseCase } from 'src/common/interfaces';
import { EventEntity } from 'src/domain/entities';

interface RemoveShopperFromEventDto {
  eventId: string;
  shopperId: string;
}

@Injectable()
export class EventRemoveShopperUseCase
  implements IBaseUseCase<EventEntity, RemoveShopperFromEventDto>
{
  constructor(private readonly eventRepository: IEventRepository) {}

  async execute(dto: RemoveShopperFromEventDto): Promise<EventEntity> {
    return this.eventRepository.removeShopperFromEvent(
      dto.eventId,
      dto.shopperId,
    );
  }
}
