import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/common/interfaces';
import { CreateOwnerDto } from 'src/domain/dtos';
import { OwnerEntity } from 'src/domain/entities';
import { IOwnerRepository } from '../../repositories/iowner.repository';

@Injectable()
export class OwnerCreateUseCase
  implements IBaseUseCase<OwnerEntity, CreateOwnerDto>
{
  constructor(private readonly ownerRepository: IOwnerRepository) {}

  async execute(data: CreateOwnerDto): Promise<OwnerEntity> {
    const owner = await this.ownerRepository.create({
      ...data,
    });

    return owner;
  }
}
