import { Injectable } from '@nestjs/common';
import { IEventRepository } from '../../repositories/ievent.repository';
import { IBaseUseCase } from 'src/common/interfaces';
import { ResourceNotFoundError } from 'src/domain/errors/resource-not-found';

@Injectable()
export class EventDeleteUseCase implements IBaseUseCase<void, string> {
  constructor(private readonly eventRepository: IEventRepository) {}

  async execute(id: string): Promise<void> {
    const event = await this.eventRepository.findById(id);

    if (!event) {
      throw new ResourceNotFoundError();
    }

    await this.eventRepository.delete(id);
  }
}
