import { Injectable } from '@nestjs/common';
import { IOrderRepository } from '../../repositories/iorder.repository';
import { IBaseUseCase } from 'src/common/interfaces';
import { OrderEntity } from 'src/domain/entities';
import { CreateOrderDto } from 'src/domain/dtos';

@Injectable()
export class OrderCreateUseCase
  implements IBaseUseCase<OrderEntity, CreateOrderDto>
{
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(dto: CreateOrderDto): Promise<any> {
    const { orderItems, ...orderData } = dto;

    const order = await this.orderRepository.createOrderWithItems(
      orderData,
      orderItems,
    );

    return order;
  }
}
