import { Injectable } from '@nestjs/common';
import { IEventRepository } from '../../repositories/ievent.repository';
import { IBaseUseCase } from 'src/common/interfaces';

@Injectable()
export class EventFindWithShoppersUseCase
  implements IBaseUseCase<any, string>
{
  constructor(private readonly eventRepository: IEventRepository) {}

  async execute(eventId: string): Promise<any> {
    return this.eventRepository.findEventWithShoppers(eventId);
  }
} 
