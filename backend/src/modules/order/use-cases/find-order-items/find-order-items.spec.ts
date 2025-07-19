import { describe, it, expect, beforeEach, vi } from 'vitest';
import { OrderFindItemsUseCase } from './find-order-items.use-case';
import { IOrderRepository } from '../../repositories/iorder.repository';

describe('OrderFindItemsUseCase', () => {
  let useCase: OrderFindItemsUseCase;
  let mockOrderRepository: any;

  beforeEach(() => {
    mockOrderRepository = {
      prismaService: {
        orderItem: {
          findMany: vi.fn(),
        },
      },
    };

    useCase = new OrderFindItemsUseCase(mockOrderRepository);
  });

  it('should find order items successfully', async () => {
    const orderId = 'order-123';
    const expectedOrderItems = [
      {
        id: 'order-item-1',
        quantity: 2,
        priceInCents: 2500,
        status: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        orderId: orderId,
        productId: 'product-1',
        product: {
          id: 'product-1',
          name: 'Big Mac',
          description: 'Hambúrguer clássico',
          priceInCents: 2500,
          createdAt: new Date(),
          updatedAt: new Date(),
          shopperId: 'shopper-1',
          shopper: {
            id: 'shopper-1',
            name: 'McDonald\'s',
            email: 'mcdonalds@test.com',
            password: 'password',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
        order: {
          id: orderId,
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
      },
      {
        id: 'order-item-2',
        quantity: 1,
        priceInCents: 2000,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        orderId: orderId,
        productId: 'product-2',
        product: {
          id: 'product-2',
          name: 'Pizza Margherita',
          description: 'Pizza tradicional',
          priceInCents: 2000,
          createdAt: new Date(),
          updatedAt: new Date(),
          shopperId: 'shopper-2',
          shopper: {
            id: 'shopper-2',
            name: 'Pizza Hut',
            email: 'pizzahut@test.com',
            password: 'password',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
        order: {
          id: orderId,
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
      },
    ];

    mockOrderRepository.prismaService.orderItem.findMany.mockResolvedValue(expectedOrderItems);

    const result = await useCase.execute(orderId);

    expect(mockOrderRepository.prismaService.orderItem.findMany).toHaveBeenCalledWith({
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
    expect(result).toEqual(expectedOrderItems);
  });
}); 
