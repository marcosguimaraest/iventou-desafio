import { OwnerCreateUseCase } from '../use-cases/create/owner-create.use-case';
import { OwnerDeleteUseCase } from '../use-cases/delete/owner-delete.use-case';
import { OwnerFindAllUseCase } from '../use-cases/find-all/owner-find-all.use-case';
import { OwnerFindOneByIdUseCase } from '../use-cases/find-one-by-id/owner-find-one-by-id.use-case';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateOwnerDto } from 'src/domain/dtos';

@Controller('owner')
export class OwnerController {
  constructor(
    private readonly ownerCreateUseCase: OwnerCreateUseCase,
    private readonly ownerFindAllUseCase: OwnerFindAllUseCase,
    private readonly ownerFindOneByIdUseCase: OwnerFindOneByIdUseCase,
    private readonly ownerDeleteUseCase: OwnerDeleteUseCase,
  ) {}

  @Post()
  CreateOwner(@Body() createOwnerDto: CreateOwnerDto) {
    return this.ownerCreateUseCase.execute(createOwnerDto);
  }

  @Get()
  FindAllOwners() {
    return this.ownerFindAllUseCase.execute();
  }

  @Get(':id')
  FindOneOwnerById(@Param('id') id: string) {
    return this.ownerFindOneByIdUseCase.execute(id);
  }

  @Delete(':id')
  DeleteOwner(@Param('id') id: string) {
    return this.ownerDeleteUseCase.execute(id);
  }
}
