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

  async execute(dto: CreateOrderDto): Promise<OrderEntity> {
    const { orderItems, ...orderData } = dto;

    const order = await this.orderRepository.prismaService.order.create({
      data: {
        ...orderData,
        orderItems: {
          create: orderItems.map(item => ({
            ...item,
            status: false,
          })),
        },
      },
    });

    return order;
  }
} 
