import { Event } from '@prisma/client';

export class EventEntity implements Event {
  id: string;

  name: string;

  description: string;

  createdAt: Date;

  updatedAt: Date;

  eventOwnerId: string;
}
