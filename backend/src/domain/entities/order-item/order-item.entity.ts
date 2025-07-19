import { OrderItem } from '@prisma/client';

export class OrderItemEntity implements OrderItem {
  id: string;

  quantity: number;

  priceInCents: number;

  status: boolean;

  createdAt: Date;

  updatedAt: Date;

  orderId: string;

  productId: string;
}
