import { RepositoryFactory } from 'src/common/factories';
import { ProductEntity } from 'src/domain/entities';

export abstract class IProductRepository extends RepositoryFactory<ProductEntity> {
  constructor() {
    super('product');
  }
}
