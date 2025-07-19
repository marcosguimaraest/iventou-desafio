import { Order } from '@prisma/client';

export class OrderEntity implements Order {
  id: string;

  totalInCents: number;

  createdAt: Date;

  updatedAt: Date;

  userId: string;
}
