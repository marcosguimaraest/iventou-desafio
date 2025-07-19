import { Injectable } from '@nestjs/common';
import { IOrderRepository } from '../../repositories/iorder.repository';
import { IBaseUseCase } from 'src/common/interfaces';

@Injectable()
export class OrderFindItemsUseCase implements IBaseUseCase<any, string> {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(orderId: string): Promise<any> {
    const orderItems =
      await this.orderRepository.prismaService.orderItem.findMany({
        where: { orderId },
        include: {
          product: {
            include: {
              shopper: true,
            },
          },
          order: {
            include: {
              user: true,
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

    return orderItems;
  }
}
