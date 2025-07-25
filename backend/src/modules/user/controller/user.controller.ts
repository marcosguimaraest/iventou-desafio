import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/domain/dtos';
import { UserCreateUseCase } from '../use-cases/create/user-create.use-case';
import { UserDeleteUseCase } from '../use-cases/delete/user-delete.use-case';
import { UserFindAllUseCase } from '../use-cases/find-all/user-find-all.use-case';
import { UserFindOneByIdUseCase } from '../use-cases/find-one-by-id/user-find-one-by-id.use-case';

@Controller('user')
export class UserController {
  constructor(
    private readonly userCreateUseCase: UserCreateUseCase,
    private readonly userFindAllUseCase: UserFindAllUseCase,
    private readonly userFindOneByIdUseCase: UserFindOneByIdUseCase,
    private readonly userDeleteUseCase: UserDeleteUseCase,
  ) {}

  @Post()
  CreateUser(@Body() createUserDto: CreateUserDto) {
    return this.userCreateUseCase.execute(createUserDto);
  }

  @Get()
  FindAllUsers() {
    return this.userFindAllUseCase.execute();
  }

  @Get(':id')
  FindOneUserById(@Param('id') id: string) {
    return this.userFindOneByIdUseCase.execute(id);
  }

  @Delete(':id')
  DeleteUser(@Param('id') id: string) {
    return this.userDeleteUseCase.execute(id);
  }
}
