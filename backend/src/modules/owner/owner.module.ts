import { Module } from '@nestjs/common';
import { OwnerCreateUseCase } from './use-cases/create/owner-create.use-case';
import { OwnerFindAllUseCase } from './use-cases/find-all/owner-find-all.use-case';
import { OwnerFindOneByIdUseCase } from './use-cases/find-one-by-id/owner-find-one-by-id.use-case';
import { IOwnerRepository } from './repositories/iowner.repository';
import { OwnerPrismaRepository } from './repositories/owner.prisma.repository';
import { OwnerDeleteUseCase } from './use-cases/delete/owner-delete.use-case';
import { OwnerController } from './controller/owner.controller';

@Module({
  imports: [],
  providers: [
    OwnerCreateUseCase,
    OwnerFindAllUseCase,
    OwnerFindOneByIdUseCase,
    OwnerDeleteUseCase,
    { provide: IOwnerRepository, useClass: OwnerPrismaRepository },
  ],
  controllers: [OwnerController],
  exports: [
    OwnerCreateUseCase,
    OwnerFindAllUseCase,
    OwnerFindOneByIdUseCase,
    OwnerDeleteUseCase,
  ],
})
export class OwnerModule {}
