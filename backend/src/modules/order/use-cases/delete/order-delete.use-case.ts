import { Injectable } from '@nestjs/common';
import { IOrderRepository } from '../../repositories/iorder.repository';
import { IBaseUseCase } from 'src/common/interfaces';
import { OrderEntity } from 'src/domain/entities';

@Injectable()
export class OrderDeleteUseCase implements IBaseUseCase<OrderEntity, string> {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(id: string): Promise<OrderEntity> {
    return this.orderRepository.delete(id);
  }
}
