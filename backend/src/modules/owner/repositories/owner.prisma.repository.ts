import { Injectable } from '@nestjs/common';
import { IOwnerRepository } from './iowner.repository';

@Injectable()
export class OwnerPrismaRepository extends IOwnerRepository {}
