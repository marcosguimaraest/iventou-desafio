import { Injectable } from '@nestjs/common';
import { IOrderRepository } from '../../repositories/iorder.repository';
import { IBaseUseCase } from 'src/common/interfaces';

@Injectable()
export class OrderFindItemByIdUseCase
  implements IBaseUseCase<any, string>
{
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(orderItemId: string): Promise<any> {
    const orderItem = await this.orderRepository.prismaService.orderItem.findUnique({
      where: { id: orderItemId },
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

    if (!orderItem) {
      return null;
    }

    return orderItem;
  }
} 
