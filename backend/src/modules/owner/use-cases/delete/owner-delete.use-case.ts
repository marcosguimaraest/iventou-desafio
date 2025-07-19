import { Injectable } from '@nestjs/common';
import { IOwnerRepository } from '../../repositories/iowner.repository';
import { IBaseUseCase } from 'src/common/interfaces';
import { ResourceNotFoundError } from 'src/domain/errors/resource-not-found';

@Injectable()
export class OwnerDeleteUseCase implements IBaseUseCase<void, string> {
  constructor(private readonly ownerRepository: IOwnerRepository) {}

  async execute(id: string): Promise<void> {
    const owner = await this.ownerRepository.findById(id);

    if (!owner) {
      throw new ResourceNotFoundError();
    }

    await this.ownerRepository.delete(id);
  }
}
