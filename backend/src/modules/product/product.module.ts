import { Module } from '@nestjs/common';
import { ProductCreateUseCase } from './use-cases/create/product-create.use-case';
import { ProductFindAllUseCase } from './use-cases/find-all/product-find-all.use-case';
import { ProductFindOneByIdUseCase } from './use-cases/find-one-by-id/product-find-one-by-id.use-case';
import { IProductRepository } from './repositories/iproduct.repository';
import { ProductPrismaRepository } from './repositories/product.prisma.repository';
import { ProductDeleteUseCase } from './use-cases/delete/product-delete.use-case';
import { ProductController } from './controller/product.controller';

@Module({
  imports: [],
  providers: [
    ProductCreateUseCase,
    ProductFindAllUseCase,
    ProductFindOneByIdUseCase,
    ProductDeleteUseCase,
    { provide: IProductRepository, useClass: ProductPrismaRepository },
  ],
  controllers: [ProductController],
  exports: [
    ProductCreateUseCase,
    ProductFindAllUseCase,
    ProductFindOneByIdUseCase,
    ProductDeleteUseCase,
  ],
})
export class ProductModule {}
