import { RepositoryFactory } from 'src/common/factories';
import { OwnerEntity } from 'src/domain/entities';

export abstract class IOwnerRepository extends RepositoryFactory<OwnerEntity> {
  constructor() {
    super('owner');
  }
}
