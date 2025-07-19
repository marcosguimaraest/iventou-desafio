import { describe, it, expect, beforeEach, vi } from 'vitest';
import { OrderCreateUseCase } from './order-create.use-case';
import { IOrderRepository } from '../../repositories/iorder.repository';
import { CreateOrderDto } from 'src/domain/dtos';

describe('OrderCreateUseCase', () => {
  let useCase: OrderCreateUseCase;
  let mockOrderRepository: any;

  beforeEach(() => {
    mockOrderRepository = {
      prismaService: {
        order: {
          create: vi.fn(),
        },
      },
    };

    useCase = new OrderCreateUseCase(mockOrderRepository);
  });

  it('should create order successfully', async () => {
    const createOrderDto: CreateOrderDto = {
      userId: 'user-123',
      totalInCents: 5000,
      orderItems: [
        {
          productId: 'product-1',
          quantity: 2,
          priceInCents: 2500,
        },
        {
          productId: 'product-2',
          quantity: 1,
          priceInCents: 2000,
        },
      ],
    };

    const expectedOrder = {
      id: 'order-123',
      totalInCents: 5000,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 'user-123',
    };

    mockOrderRepository.prismaService.order.create.mockResolvedValue(expectedOrder);

    const result = await useCase.execute(createOrderDto);

    expect(mockOrderRepository.prismaService.order.create).toHaveBeenCalledWith({
      data: {
        userId: 'user-123',
        totalInCents: 5000,
        orderItems: {
          create: [
            {
              productId: 'product-1',
              quantity: 2,
              priceInCents: 2500,
              status: false,
            },
            {
              productId: 'product-2',
              quantity: 1,
              priceInCents: 2000,
              status: false,
            },
          ],
        },
      },
    });
    expect(result).toEqual(expectedOrder);
  });
}); 
