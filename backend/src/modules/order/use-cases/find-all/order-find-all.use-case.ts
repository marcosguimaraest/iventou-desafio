import { Injectable } from '@nestjs/common';
import { IOrderRepository } from '../../repositories/iorder.repository';
import { IBaseUseCase } from 'src/common/interfaces';
import { OrderEntity } from 'src/domain/entities';

@Injectable()
export class OrderFindAllUseCase
  implements IBaseUseCase<OrderEntity[], null>
{
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(): Promise<OrderEntity[]> {
    return this.orderRepository.findAll();
  }
} 
