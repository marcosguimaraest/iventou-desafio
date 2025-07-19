import { Injectable } from '@nestjs/common';
import { OwnerEntity } from 'src/domain/entities';
import { IOwnerRepository } from './iowner.repository';
import { randomUUID } from 'crypto';

@Injectable()
export class OwnerInMemoryRepository extends IOwnerRepository {
  public owners: OwnerEntity[] = [];

  async create<T>(createDto: T): Promise<OwnerEntity> {
    const owner: OwnerEntity = {
      ...(createDto as any),
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.owners.push(owner);
    return owner;
  }

  async findById(id: string): Promise<OwnerEntity> {
    const owner = this.owners.find((owner) => owner.id === id);

    if (!owner) {
      throw new Error('Owner not found');
    }

    return owner;
  }

  async findAll(): Promise<OwnerEntity[]> {
    return this.owners;
  }

  async delete(id: string): Promise<OwnerEntity> {
    const ownerIndex = this.owners.findIndex((owner) => owner.id === id);

    if (ownerIndex === -1) {
      throw new Error('Owner not found');
    }

    const deletedOwner = this.owners[ownerIndex];
    this.owners.splice(ownerIndex, 1);

    return deletedOwner;
  }
}
