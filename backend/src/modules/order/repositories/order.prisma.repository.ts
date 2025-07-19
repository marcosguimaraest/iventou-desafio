import { Injectable } from '@nestjs/common';
import { OrderEntity } from 'src/domain/entities';
import { IOrderRepository } from './iorder.repository';

@Injectable()
export class OrderPrismaRepository extends IOrderRepository {
  async findOrderWithItems(orderId: string): Promise<any> {
    const order = await this.prismaService.order.findUnique({
      where: { id: orderId },
      include: {
        orderItems: {
          include: {
            product: {
              include: {
                shopper: true,
              },
            },
          },
        },
        user: true,
      },
    });

    if (!order) {
      throw new Error('Order not found');
    }

    return order;
  }

  async findOrdersByUser(userId: string): Promise<OrderEntity[]> {
    const orders = await this.prismaService.order.findMany({
      where: { userId },
      include: {
        orderItems: {
          include: {
            product: {
              include: {
                shopper: true,
              },
            },
          },
        },
      },
    });

    return orders as OrderEntity[];
  }
} 
