import { Owner } from '@prisma/client';

export class OwnerEntity implements Owner {
  id: string;

  name: string;

  email: string;

  password: string;

  createdAt: Date;

  updatedAt: Date;
}
