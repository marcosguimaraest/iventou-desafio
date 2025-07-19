import { describe, it, expect, beforeEach } from 'vitest';
import { OwnerInMemoryRepository } from '../../repositories/owner.in-memory.repository';
import { OwnerDeleteUseCase } from './owner-delete.use-case';
import { randomUUID } from 'crypto';

let ownerRepository: OwnerInMemoryRepository;
let ownerDeleteUseCase: OwnerDeleteUseCase;

describe('OwnerDeleteUseCase', () => {
  beforeEach(() => {
    ownerRepository = new OwnerInMemoryRepository();
    ownerDeleteUseCase = new OwnerDeleteUseCase(ownerRepository);
  });

  it('should be able to delete a owner', async () => {
    const owner = await ownerRepository.create({
      name: 'Owner 1',
      description: 'Description 1',
      priceInCents: 10000,
      shopperId: randomUUID(),
    });

    await ownerDeleteUseCase.execute(owner.id);

    expect(ownerRepository.owners).toHaveLength(0);
  });
});
