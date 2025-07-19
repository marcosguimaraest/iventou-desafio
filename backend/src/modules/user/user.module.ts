import { Module } from '@nestjs/common';
import { UserCreateUseCase } from './use-cases/create/user-create.use-case';
import { UserFindAllUseCase } from './use-cases/find-all/user-find-all.use-case';
import { UserFindOneByIdUseCase } from './use-cases/find-one-by-id/user-find-one-by-id.use-case';
import { UserUpdateUseCase } from './use-cases/update/user-update.use-case';
import { IUserRepository } from './repositories/iuser.repository';
import { UserRepository } from './repositories/user.repository';
import { UserDeleteUseCase } from './use-cases/delete/user-delete.use-case';

@Module({
  imports: [],
  providers: [
    UserCreateUseCase,
    UserFindAllUseCase,
    UserFindOneByIdUseCase,
    UserUpdateUseCase,
    UserDeleteUseCase,
    { provide: IUserRepository, useClass: UserRepository },
  ],
  exports: [
    UserCreateUseCase,
    UserFindAllUseCase,
    UserFindOneByIdUseCase,
    UserUpdateUseCase,
    UserDeleteUseCase,
  ],
})
export class UserModule {}
