import { describe, it, expect, beforeEach, vi } from 'vitest';
import { OrderFindItemByIdUseCase } from './find-item-by-id.use-case';
import { IOrderRepository } from '../../repositories/iorder.repository';

describe('OrderFindItemByIdUseCase', () => {
  let useCase: OrderFindItemByIdUseCase;
  let mockOrderRepository: any;

  beforeEach(() => {
    mockOrderRepository = {
      prismaService: {
        orderItem: {
          findUnique: vi.fn(),
        },
      },
    };

    useCase = new OrderFindItemByIdUseCase(mockOrderRepository);
  });

  it('should find order item by id successfully', async () => {
    const orderItemId = 'order-item-123';
    const expectedOrderItem = {
      id: orderItemId,
      quantity: 2,
      priceInCents: 2500,
      status: false,
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
          name: 'McDonald\'s',
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

    mockOrderRepository.prismaService.orderItem.findUnique.mockResolvedValue(expectedOrderItem);

    const result = await useCase.execute(orderItemId);

    expect(mockOrderRepository.prismaService.orderItem.findUnique).toHaveBeenCalledWith({
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
    expect(result).toEqual(expectedOrderItem);
  });
}); 
