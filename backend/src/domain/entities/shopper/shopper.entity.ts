import { Shopper } from '@prisma/client';

export class ShopperEntity implements Shopper {
  id: string;

  name: string;

  email: string;

  password: string;

  createdAt: Date;

  updatedAt: Date;
}
