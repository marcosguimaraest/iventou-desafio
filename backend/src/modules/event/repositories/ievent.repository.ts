import { RepositoryFactory } from 'src/common/factories';
import { EventEntity } from 'src/domain/entities';

export abstract class IEventRepository extends RepositoryFactory<EventEntity> {
  constructor() {
    super('event');
  }
}
