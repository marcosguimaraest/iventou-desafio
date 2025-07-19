import { Injectable } from '@nestjs/common';
import { EventEntity } from 'src/domain/entities';
import { IEventRepository } from './ievent.repository';
import { randomUUID } from 'crypto';

@Injectable()
export class EventInMemoryRepository extends IEventRepository {
  public events: EventEntity[] = [];

  async create<T>(createDto: T): Promise<EventEntity> {
    const event: EventEntity = {
      ...(createDto as any),
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.events.push(event);
    return event;
  }

  async findById(id: string): Promise<EventEntity> {
    const event = this.events.find((event) => event.id === id);

    if (!event) {
      return null as any;
    }

    return event;
  }

  async findAll(): Promise<EventEntity[]> {
    return this.events;
  }

  async delete(id: string): Promise<EventEntity> {
    const eventIndex = this.events.findIndex((event) => event.id === id);

    if (eventIndex === -1) {
      return null as any;
    }

    const deletedEvent = this.events[eventIndex];
    this.events.splice(eventIndex, 1);

    return deletedEvent;
  }

  async addShopperToEvent(
    eventId: string,
    shopperId: string,
  ): Promise<EventEntity> {
    const event = this.events.find((event) => event.id === eventId);
    if (!event) {
      return null as any;
    }
    return event;
  }

  async removeShopperFromEvent(
    eventId: string,
    shopperId: string,
  ): Promise<EventEntity> {
    const event = this.events.find((event) => event.id === eventId);
    if (!event) {
      return null as any;
    }
    return event;
  }

  async findEventWithShoppers(
    eventId: string,
  ): Promise<EventEntity & { shoppers: any[] }> {
    const event = this.events.find((event) => event.id === eventId);
    if (!event) {
      return null as any;
    }
    return { ...event, shoppers: [] };
  }

  async findEventWithShoppersAndProducts(eventId: string): Promise<any> {
    const event = this.events.find((event) => event.id === eventId);
    if (!event) {
      return null as any;
    }
    return { ...event, shoppers: [] };
  }
}
