import { EventCreateUseCase } from '../use-cases/create/event-create.use-case';
import { EventDeleteUseCase } from '../use-cases/delete/event-delete.use-case';
import { EventFindAllUseCase } from '../use-cases/find-all/event-find-all.use-case';
import { EventFindOneByIdUseCase } from '../use-cases/find-one-by-id/event-find-one-by-id.use-case';
import { EventAddShopperUseCase } from '../use-cases/add-shopper/add-shopper.use-case';
import { EventRemoveShopperUseCase } from '../use-cases/remove-shopper/remove-shopper.use-case';
import { EventFindWithShoppersUseCase } from '../use-cases/find-with-shoppers/find-with-shoppers.use-case';
import { EventFindWithShoppersAndProductsUseCase } from '../use-cases/find-with-shoppers-and-products/find-with-shoppers-and-products.use-case';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateEventDto } from 'src/domain/dtos';

@Controller('event')
export class EventController {
  constructor(
    private readonly eventCreateUseCase: EventCreateUseCase,
    private readonly eventFindAllUseCase: EventFindAllUseCase,
    private readonly eventFindOneByIdUseCase: EventFindOneByIdUseCase,
    private readonly eventDeleteUseCase: EventDeleteUseCase,
    private readonly eventAddShopperUseCase: EventAddShopperUseCase,
    private readonly eventRemoveShopperUseCase: EventRemoveShopperUseCase,
    private readonly eventFindWithShoppersUseCase: EventFindWithShoppersUseCase,
    private readonly eventFindWithShoppersAndProductsUseCase: EventFindWithShoppersAndProductsUseCase,
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

  // Rotas para gerenciar shoppers (barracas) no evento
  @Post(':eventId/shoppers/:shopperId')
  AddShopperToEvent(
    @Param('eventId') eventId: string,
    @Param('shopperId') shopperId: string,
  ) {
    return this.eventAddShopperUseCase.execute({ eventId, shopperId });
  }

  @Delete(':eventId/shoppers/:shopperId')
  RemoveShopperFromEvent(
    @Param('eventId') eventId: string,
    @Param('shopperId') shopperId: string,
  ) {
    return this.eventRemoveShopperUseCase.execute({ eventId, shopperId });
  }

  @Get(':eventId/shoppers')
  FindEventWithShoppers(@Param('eventId') eventId: string) {
    return this.eventFindWithShoppersUseCase.execute(eventId);
  }

  @Get(':eventId/shoppers-with-products')
  FindEventWithShoppersAndProducts(@Param('eventId') eventId: string) {
    return this.eventFindWithShoppersAndProductsUseCase.execute(eventId);
  }
}
