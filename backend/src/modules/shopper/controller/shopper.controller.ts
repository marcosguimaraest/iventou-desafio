import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateShopperDto } from 'src/domain/dtos';
import { ShopperCreateUseCase } from '../use-cases/create/shopper-create.use-case';
import { ShopperDeleteUseCase } from '../use-cases/delete/shopper-delete.use-case';
import { ShopperFindAllUseCase } from '../use-cases/find-all/shopper-find-all.use-case';
import { ShopperFindOneByIdUseCase } from '../use-cases/find-one-by-id/shopper-find-one-by-id.use-case';
import { ShopperFindWithProductsUseCase } from '../use-cases/find-with-products/find-with-products.use-case';
import { ShopperFindWithEventsUseCase } from '../use-cases/find-with-events/find-with-events.use-case';

@Controller('shopper')
export class ShopperController {
  constructor(
    private readonly shopperCreateUseCase: ShopperCreateUseCase,
    private readonly shopperFindAllUseCase: ShopperFindAllUseCase,
    private readonly shopperFindOneByIdUseCase: ShopperFindOneByIdUseCase,
    private readonly shopperDeleteUseCase: ShopperDeleteUseCase,
    private readonly shopperFindWithProductsUseCase: ShopperFindWithProductsUseCase,
    private readonly shopperFindWithEventsUseCase: ShopperFindWithEventsUseCase,
  ) {}

  @Post()
  CreateShopper(@Body() createShopperDto: CreateShopperDto) {
    return this.shopperCreateUseCase.execute(createShopperDto);
  }

  @Get()
  FindAllShoppers() {
    return this.shopperFindAllUseCase.execute();
  }

  @Get(':id')
  FindOneShopperById(@Param('id') id: string) {
    return this.shopperFindOneByIdUseCase.execute(id);
  }

  @Delete(':id')
  DeleteShopper(@Param('id') id: string) {
    return this.shopperDeleteUseCase.execute(id);
  }

  // Rotas para buscar dados relacionados
  @Get(':shopperId/products')
  FindShopperWithProducts(@Param('shopperId') shopperId: string) {
    return this.shopperFindWithProductsUseCase.execute(shopperId);
  }

  @Get(':shopperId/events')
  FindShopperWithEvents(@Param('shopperId') shopperId: string) {
    return this.shopperFindWithEventsUseCase.execute(shopperId);
  }
}
