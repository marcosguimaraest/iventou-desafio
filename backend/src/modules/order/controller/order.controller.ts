import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateOrderDto } from 'src/domain/dtos';
import { OrderCreateUseCase } from '../use-cases/create/order-create.use-case';
import { OrderDeleteUseCase } from '../use-cases/delete/order-delete.use-case';
import { OrderFindAllUseCase } from '../use-cases/find-all/order-find-all.use-case';
import { OrderFindOneByIdUseCase } from '../use-cases/find-one-by-id/order-find-one-by-id.use-case';
import { OrderUpdateItemStatusUseCase } from '../use-cases/update-item-status/update-item-status.use-case';
import { OrderFindItemByIdUseCase } from '../use-cases/find-item-by-id/find-item-by-id.use-case';
import { OrderFindItemsUseCase } from '../use-cases/find-order-items/find-order-items.use-case';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderCreateUseCase: OrderCreateUseCase,
    private readonly orderFindAllUseCase: OrderFindAllUseCase,
    private readonly orderFindOneByIdUseCase: OrderFindOneByIdUseCase,
    private readonly orderDeleteUseCase: OrderDeleteUseCase,
    private readonly orderUpdateItemStatusUseCase: OrderUpdateItemStatusUseCase,
    private readonly orderFindItemByIdUseCase: OrderFindItemByIdUseCase,
    private readonly orderFindItemsUseCase: OrderFindItemsUseCase,
  ) {}

  @Post()
  CreateOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderCreateUseCase.execute(createOrderDto);
  }

  @Get()
  FindAllOrders() {
    return this.orderFindAllUseCase.execute();
  }

  @Get(':id')
  FindOneOrderById(@Param('id') id: string) {
    return this.orderFindOneByIdUseCase.execute(id);
  }

  @Delete(':id')
  DeleteOrder(@Param('id') id: string) {
    return this.orderDeleteUseCase.execute(id);
  }

  @Get('item/:orderItemId')
  FindOrderItemById(@Param('orderItemId') orderItemId: string) {
    return this.orderFindItemByIdUseCase.execute(orderItemId);
  }

  @Put('item/:orderItemId/retrieve')
  MarkItemAsRetrieved(@Param('orderItemId') orderItemId: string) {
    return this.orderUpdateItemStatusUseCase.execute({
      orderItemId,
      status: true,
    });
  }

  @Get(':orderId/items')
  FindOrderItems(@Param('orderId') orderId: string) {
    return this.orderFindItemsUseCase.execute(orderId);
  }
}
