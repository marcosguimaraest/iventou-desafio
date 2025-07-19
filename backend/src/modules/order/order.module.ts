import { Module } from '@nestjs/common';
import { OrderCreateUseCase } from './use-cases/create/order-create.use-case';
import { OrderFindAllUseCase } from './use-cases/find-all/order-find-all.use-case';
import { OrderFindOneByIdUseCase } from './use-cases/find-one-by-id/order-find-one-by-id.use-case';
import { OrderDeleteUseCase } from './use-cases/delete/order-delete.use-case';
import { OrderUpdateItemStatusUseCase } from './use-cases/update-item-status/update-item-status.use-case';
import { OrderFindItemByIdUseCase } from './use-cases/find-item-by-id/find-item-by-id.use-case';
import { OrderFindItemsUseCase } from './use-cases/find-order-items/find-order-items.use-case';
import { OrderController } from './controller/order.controller';
import { IOrderRepository } from './repositories/iorder.repository';
import { OrderPrismaRepository } from './repositories/order.prisma.repository';

@Module({
  imports: [],
  providers: [
    OrderCreateUseCase,
    OrderFindAllUseCase,
    OrderFindOneByIdUseCase,
    OrderDeleteUseCase,
    OrderUpdateItemStatusUseCase,
    OrderFindItemByIdUseCase,
    OrderFindItemsUseCase,
    { provide: IOrderRepository, useClass: OrderPrismaRepository },
  ],
  controllers: [OrderController],
  exports: [
    OrderCreateUseCase,
    OrderFindAllUseCase,
    OrderFindOneByIdUseCase,
    OrderDeleteUseCase,
    OrderUpdateItemStatusUseCase,
    OrderFindItemByIdUseCase,
  ],
})
export class OrderModule {}
