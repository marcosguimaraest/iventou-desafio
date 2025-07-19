import { Module } from '@nestjs/common';
import { ShopperCreateUseCase } from './use-cases/create/shopper-create.use-case';
import { ShopperFindAllUseCase } from './use-cases/find-all/shopper-find-all.use-case';
import { ShopperDeleteUseCase } from './use-cases/delete/shopper-delete.use-case';
import { ShopperController } from './controller/shopper.controller';
import { ShopperFindOneByIdUseCase } from './use-cases/find-one-by-id/shopper-find-one-by-id.use-case';
import { ShopperFindWithProductsUseCase } from './use-cases/find-with-products/find-with-products.use-case';
import { ShopperFindWithEventsUseCase } from './use-cases/find-with-events/find-with-events.use-case';
import { IShopperRepository } from './repositories/ishopper.repository';
import { ShopperPrismaRepository } from './repositories/shopper.prisma.repository';

@Module({
  imports: [],
  providers: [
    ShopperCreateUseCase,
    ShopperFindAllUseCase,
    ShopperFindOneByIdUseCase,
    ShopperDeleteUseCase,
    ShopperFindWithProductsUseCase,
    ShopperFindWithEventsUseCase,
    { provide: IShopperRepository, useClass: ShopperPrismaRepository },
  ],
  controllers: [ShopperController],
  exports: [
    ShopperCreateUseCase,
    ShopperFindAllUseCase,
    ShopperFindOneByIdUseCase,
    ShopperDeleteUseCase,
    ShopperFindWithProductsUseCase,
    ShopperFindWithEventsUseCase,
  ],
})
export class ShopperModule {}
