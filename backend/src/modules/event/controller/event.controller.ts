import { EventCreateUseCase } from '../use-cases/create/event-create.use-case';
import { EventDeleteUseCase } from '../use-cases/delete/event-delete.use-case';
import { EventFindAllUseCase } from '../use-cases/find-all/event-find-all.use-case';
import { EventFindOneByIdUseCase } from '../use-cases/find-one-by-id/event-find-one-by-id.use-case';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateEventDto } from 'src/domain/dtos';

@Controller('event')
export class EventController {
  constructor(
    private readonly eventCreateUseCase: EventCreateUseCase,
    private readonly eventFindAllUseCase: EventFindAllUseCase,
    private readonly eventFindOneByIdUseCase: EventFindOneByIdUseCase,
    private readonly eventDeleteUseCase: EventDeleteUseCase,
  ) {}

  @Post()
  CreateEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventCreateUseCase.execute(createEventDto);
  }

  @Get()
  FindAllEvents() {
    return this.eventFindAllUseCase.execute();
  }

  @Get(':id')
  FindOneEventById(@Param('id') id: string) {
    return this.eventFindOneByIdUseCase.execute(id);
  }

  @Delete(':id')
  DeleteEvent(@Param('id') id: string) {
    return this.eventDeleteUseCase.execute(id);
  }
}
