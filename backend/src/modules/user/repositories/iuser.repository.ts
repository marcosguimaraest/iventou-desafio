import { RepositoryFactory } from 'src/common/factories';
import { UserEntity } from 'src/domain/entities';

export abstract class IUserRepository extends RepositoryFactory<UserEntity> {
  constructor() {
    super('user');
  }
}
