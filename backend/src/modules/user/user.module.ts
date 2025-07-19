import { Module } from '@nestjs/common';
import { UserCreateUseCase } from './use-cases/create/user-create.use-case';
import { UserFindAllUseCase } from './use-cases/find-all/user-find-all.use-case';
import { UserFindOneByIdUseCase } from './use-cases/find-one-by-id/user-find-one-by-id.use-case';
import { IUserRepository } from './repositories/iuser.repository';
import { UserPrismaRepository } from './repositories/user.prisma.repository';
import { UserDeleteUseCase } from './use-cases/delete/user-delete.use-case';
import { UserController } from './controller/user.controller';

@Module({
  imports: [],
  providers: [
    UserCreateUseCase,
    UserFindAllUseCase,
    UserFindOneByIdUseCase,
    UserDeleteUseCase,
    { provide: IUserRepository, useClass: UserPrismaRepository },
  ],
  controllers: [UserController],
  exports: [
    UserCreateUseCase,
    UserFindAllUseCase,
    UserFindOneByIdUseCase,
    UserDeleteUseCase,
  ],
})
export class UserModule {}
