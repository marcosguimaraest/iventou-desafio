import { Injectable } from '@nestjs/common';
import { IProductRepository } from './iproduct.repository';

@Injectable()
export class ProductPrismaRepository extends IProductRepository {}
