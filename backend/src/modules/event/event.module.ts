import { Module } from '@nestjs/common';
import { EventCreateUseCase } from './use-cases/create/event-create.use-case';
import { EventFindAllUseCase } from './use-cases/find-all/event-find-all.use-case';
import { EventFindOneByIdUseCase } from './use-cases/find-one-by-id/event-find-one-by-id.use-case';
import { IEventRepository } from './repositories/ievent.repository';
import { EventPrismaRepository } from './repositories/event.prisma.repository';
import { EventDeleteUseCase } from './use-cases/delete/event-delete.use-case';
import { EventController } from './controller/event.controller';
import { EventAddShopperUseCase } from './use-cases/add-shopper/add-shopper.use-case';
import { EventRemoveShopperUseCase } from './use-cases/remove-shopper/remove-shopper.use-case';
import { EventFindWithShoppersUseCase } from './use-cases/find-with-shoppers/find-with-shoppers.use-case';
import { EventFindWithShoppersAndProductsUseCase } from './use-cases/find-with-shoppers-and-products/find-with-shoppers-and-products.use-case';

@Module({
  imports: [],
  providers: [
    EventCreateUseCase,
    EventFindAllUseCase,
    EventFindOneByIdUseCase,
    EventDeleteUseCase,
    EventAddShopperUseCase,
    EventRemoveShopperUseCase,
    EventFindWithShoppersUseCase,
    EventFindWithShoppersAndProductsUseCase,
    { provide: IEventRepository, useClass: EventPrismaRepository },
  ],
  controllers: [EventController],
  exports: [
    EventCreateUseCase,
    EventFindAllUseCase,
    EventFindOneByIdUseCase,
    EventDeleteUseCase,
    EventAddShopperUseCase,
    EventRemoveShopperUseCase,
    EventFindWithShoppersUseCase,
    EventFindWithShoppersAndProductsUseCase,
  ],
})
export class EventModule {}
