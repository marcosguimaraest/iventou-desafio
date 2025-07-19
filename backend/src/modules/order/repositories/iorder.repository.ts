import { RepositoryFactory } from 'src/common/factories';
import { OrderEntity } from 'src/domain/entities';

export abstract class IOrderRepository extends RepositoryFactory<OrderEntity> {
  constructor() {
    super('order');
  }

  abstract findOrderWithItems(orderId: string): Promise<any>;
  abstract findOrdersByUser(userId: string): Promise<OrderEntity[]>;
} 
