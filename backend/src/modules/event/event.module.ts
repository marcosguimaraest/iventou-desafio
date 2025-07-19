import { Module } from '@nestjs/common';
import { EventCreateUseCase } from './use-cases/create/event-create.use-case';
import { EventFindAllUseCase } from './use-cases/find-all/event-find-all.use-case';
import { EventFindOneByIdUseCase } from './use-cases/find-one-by-id/event-find-one-by-id.use-case';
import { IEventRepository } from './repositories/ievent.repository';
import { EventPrismaRepository } from './repositories/event.prisma.repository';
import { EventDeleteUseCase } from './use-cases/delete/event-delete.use-case';
import { EventController } from './controller/event.controller';

@Module({
  imports: [],
  providers: [
    EventCreateUseCase,
    EventFindAllUseCase,
    EventFindOneByIdUseCase,
    EventDeleteUseCase,
    { provide: IEventRepository, useClass: EventPrismaRepository },
  ],
  controllers: [EventController],
  exports: [
    EventCreateUseCase,
    EventFindAllUseCase,
    EventFindOneByIdUseCase,
    EventDeleteUseCase,
  ],
})
export class EventModule {}
