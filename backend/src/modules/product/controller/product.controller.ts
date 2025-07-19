import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateProductDto } from 'src/domain/dtos';
import { ProductCreateUseCase } from '../use-cases/create/product-create.use-case';
import { ProductDeleteUseCase } from '../use-cases/delete/product-delete.use-case';
import { ProductFindAllUseCase } from '../use-cases/find-all/product-find-all.use-case';
import { ProductFindOneByIdUseCase } from '../use-cases/find-one-by-id/product-find-one-by-id.use-case';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productCreateUseCase: ProductCreateUseCase,
    private readonly productFindAllUseCase: ProductFindAllUseCase,
    private readonly productFindOneByIdUseCase: ProductFindOneByIdUseCase,
    private readonly productDeleteUseCase: ProductDeleteUseCase,
  ) {}

  @Post()
  CreateProduct(@Body() createProductDto: CreateProductDto) {
    return this.productCreateUseCase.execute(createProductDto);
  }

  @Get()
  FindAllProducts() {
    return this.productFindAllUseCase.execute();
  }

  @Get(':id')
  FindOneProductById(@Param('id') id: string) {
    return this.productFindOneByIdUseCase.execute(id);
  }

  @Delete(':id')
  DeleteProduct(@Param('id') id: string) {
    return this.productDeleteUseCase.execute(id);
  }
}
