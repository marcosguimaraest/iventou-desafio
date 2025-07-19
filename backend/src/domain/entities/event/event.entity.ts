import { Event } from '@prisma/client';

export class EventEntity extends Event {
  id: string;

  name: string;

  description: string;

  createdAt: Date;

  updatedAt: Date;

  ownerId: string;
}
