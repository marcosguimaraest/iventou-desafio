import { Injectable } from '@nestjs/common';
import { IEventRepository } from './ievent.repository';

@Injectable()
export class EventPrismaRepository extends IEventRepository {}
