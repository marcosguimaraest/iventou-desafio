import { RepositoryFactory } from 'src/common/factories';
import { ShopperEntity } from 'src/domain/entities';

export abstract class IShopperRepository extends RepositoryFactory<ShopperEntity> {
  constructor() {
    super('shopper');
  }

  abstract findByEmail(email: string): Promise<ShopperEntity | null>;
  abstract findShopperWithProducts(shopperId: string): Promise<any>;
  abstract findShopperWithEvents(shopperId: string): Promise<any>;
}
