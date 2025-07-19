import { Injectable } from '@nestjs/common';
import { IEventRepository } from './ievent.repository';
import { EventEntity } from 'src/domain/entities';

@Injectable()
export class EventPrismaRepository extends IEventRepository {
  async addShopperToEvent(
    eventId: string,
    shopperId: string,
  ): Promise<EventEntity> {
    await this.prismaService.event.update({
      where: { id: eventId },
      data: {
        shoppers: {
          connect: { id: shopperId },
        },
      },
    });

    return this.findById(eventId);
  }

  async removeShopperFromEvent(
    eventId: string,
    shopperId: string,
  ): Promise<EventEntity> {
    await this.prismaService.event.update({
      where: { id: eventId },
      data: {
        shoppers: {
          disconnect: { id: shopperId },
        },
      },
    });

    return this.findById(eventId);
  }

  async findEventWithShoppers(
    eventId: string,
  ): Promise<EventEntity & { shoppers: any[] }> {
    const event = await this.prismaService.event.findUnique({
      where: { id: eventId },
      include: {
        shoppers: true,
      },
    });

    if (!event) {
      return null as any;
    }

    return event as unknown as EventEntity & { shoppers: any[] };
  }

  async findEventWithShoppersAndProducts(eventId: string): Promise<any> {
    const event = await this.prismaService.event.findUnique({
      where: { id: eventId },
      include: {
        shoppers: {
          include: {
            products: true,
          },
        },
      },
    });

    if (!event) {
      return null;
    }

    return event;
  }
}
