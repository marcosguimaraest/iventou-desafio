import { Injectable } from '@nestjs/common';
import { IOrderRepository } from '../../repositories/iorder.repository';
import { IBaseUseCase } from 'src/common/interfaces';
import { UpdateOrderItemStatusDto } from 'src/domain/dtos/order-item';

@Injectable()
export class OrderUpdateItemStatusUseCase
  implements IBaseUseCase<any, UpdateOrderItemStatusDto>
{
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(dto: UpdateOrderItemStatusDto): Promise<any> {
    const updatedOrderItem =
      await this.orderRepository.prismaService.orderItem.update({
        where: { id: dto.orderItemId },
        data: {
          status: dto.status,
          updatedAt: new Date(),
        },
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
      });

    return updatedOrderItem;
  }
}
