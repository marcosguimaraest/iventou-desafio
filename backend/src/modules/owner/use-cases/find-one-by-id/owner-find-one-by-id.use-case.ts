import { Injectable } from '@nestjs/common';
import { IOwnerRepository } from '../../repositories/iowner.repository';
import { OwnerEntity } from 'src/domain/entities';
import { IBaseUseCase } from 'src/common/interfaces';
import { ResourceNotFoundError } from 'src/domain/errors/resource-not-found';

@Injectable()
export class OwnerFindOneByIdUseCase
  implements IBaseUseCase<OwnerEntity, string>
{
  constructor(private readonly ownerRepository: IOwnerRepository) {}

  async execute(id: string): Promise<OwnerEntity> {
    const owner = await this.ownerRepository.findById(id);

    if (!owner) {
      throw new ResourceNotFoundError();
    }

    return owner;
  }
}
