import { UserCreateUseCase } from '../use-cases/create/user-create.use-case';
import { UserFindAllUseCase } from '../use-cases/find-all/user-find-all.use-case';
import { UserFindOneByIdUseCase } from '../use-cases/find-one-by-id/user-find-one-by-id.use-case';
import { UserDeleteUseCase } from '../use-cases/delete/user-delete.use-case';
import { UserUpdateUseCase } from '../use-cases/update/user-update.use-case';
import { IsPublic } from 'src/common/decorators';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/domain/dtos';

@Controller('user')
export class UserController {
  constructor(
    private readonly userCreateUseCase: UserCreateUseCase,
    private readonly userFindAllUseCase: UserFindAllUseCase,
    private readonly userFindOneByIdUseCase: UserFindOneByIdUseCase,
    private readonly userUpdateUseCase: UserUpdateUseCase,
    private readonly userDeleteUseCase: UserDeleteUseCase,
  ) {}

  @IsPublic()
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

  @Put(':id')
  UpdateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userUpdateUseCase.execute({ ...updateUserDto, id });
  }

  @Delete(':id')
  DeleteUser(@Param('id') id: string) {
    return this.userDeleteUseCase.execute(id);
  }
}
