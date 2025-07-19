import { describe, it, expect, beforeEach, vi } from 'vitest';
import { OrderCreateUseCase } from './order-create.use-case';
import { IOrderRepository } from '../../repositories/iorder.repository';
import { CreateOrderDto } from 'src/domain/dtos';

describe('OrderCreateUseCase', () => {
  let useCase: OrderCreateUseCase;
  let mockOrderRepository: any;

  beforeEach(() => {
    mockOrderRepository = {
      createOrderWithItems: vi.fn(),
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
      user: {
        id: 'user-123',
        name: 'João Silva',
        email: 'joao@test.com',
        password: 'password',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      orderItems: [
        {
          id: 'order-item-1',
          quantity: 2,
          priceInCents: 2500,
          status: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          orderId: 'order-123',
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
        },
        {
          id: 'order-item-2',
          quantity: 1,
          priceInCents: 2000,
          status: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          orderId: 'order-123',
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
        },
      ],
    };

    mockOrderRepository.createOrderWithItems.mockResolvedValue(expectedOrder);

    const result = await useCase.execute(createOrderDto);

    expect(mockOrderRepository.createOrderWithItems).toHaveBeenCalledWith(
      {
        userId: 'user-123',
        totalInCents: 5000,
      },
      [
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
      ]
    );
    expect(result).toEqual(expectedOrder);
  });
}); 
