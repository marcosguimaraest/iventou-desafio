import { Injectable } from '@nestjs/common';
import { IOwnerRepository } from '../../repositories/iowner.repository';
import { OwnerEntity, UserEntity } from 'src/domain/entities';
import { IBaseUseCase } from 'src/common/interfaces';

@Injectable()
export class OwnerFindAllUseCase implements IBaseUseCase<OwnerEntity[], null> {
  constructor(private readonly ownerRepository: IOwnerRepository) {}

  async execute(): Promise<OwnerEntity[]> {
    const owner = await this.ownerRepository.findAll();

    return owner;
  }
}
