import { RepositoryFactory } from 'src/common/factories';
import { EventEntity } from 'src/domain/entities';

export abstract class IEventRepository extends RepositoryFactory<EventEntity> {
  constructor() {
    super('event');
  }

  abstract addShopperToEvent(eventId: string, shopperId: string): Promise<EventEntity>;
  abstract removeShopperFromEvent(eventId: string, shopperId: string): Promise<EventEntity>;
  abstract findEventWithShoppers(eventId: string): Promise<EventEntity & { shoppers: any[] }>;
  abstract findEventWithShoppersAndProducts(eventId: string): Promise<any>;
}
