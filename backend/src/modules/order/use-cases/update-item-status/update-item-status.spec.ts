import { describe, it, expect, beforeEach, vi } from 'vitest';
import { OrderUpdateItemStatusUseCase } from './update-item-status.use-case';
import { IOrderRepository } from '../../repositories/iorder.repository';

describe('OrderUpdateItemStatusUseCase', () => {
  let useCase: OrderUpdateItemStatusUseCase;
  let mockOrderRepository: any;

  beforeEach(() => {
    mockOrderRepository = {
      prismaService: {
        orderItem: {
          update: vi.fn(),
        },
      },
    };

    useCase = new OrderUpdateItemStatusUseCase(mockOrderRepository);
  });

  it('should update order item status successfully', async () => {
    const orderItemId = 'order-item-123';
    const status = true;
    const expectedOrderItem = {
      id: orderItemId,
      quantity: 2,
      priceInCents: 2500,
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      orderId: 'order-123',
      productId: 'product-123',
      product: {
        id: 'product-123',
        name: 'Big Mac',
        description: 'Hambúrguer clássico',
        priceInCents: 2500,
        createdAt: new Date(),
        updatedAt: new Date(),
        shopperId: 'shopper-123',
        shopper: {
          id: 'shopper-123',
          name: "McDonald's",
          email: 'mcdonalds@test.com',
          password: 'password',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      order: {
        id: 'order-123',
        totalInCents: 5000,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 'user-123',
        user: {
          id: 'user-123',
          name: 'João Silva',
          email: 'joao@test.com',
          password: 'password',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    };

    mockOrderRepository.prismaService.orderItem.update.mockResolvedValue(
      expectedOrderItem,
    );

    const result = await useCase.execute({ orderItemId, status });

    expect(
      mockOrderRepository.prismaService.orderItem.update,
    ).toHaveBeenCalledWith({
      where: { id: orderItemId },
      data: {
        status: true,
        updatedAt: expect.any(Date),
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
    expect(result).toEqual(expectedOrderItem);
  });
});
