import { describe, it, expect, beforeEach } from 'vitest';
import { OwnerInMemoryRepository } from '../../repositories/owner.in-memory.repository';
import { OwnerFindAllUseCase } from './owner-find-all.use-case';
import { randomUUID } from 'crypto';

let ownerRepository: OwnerInMemoryRepository;
let ownerFindAllUseCase: OwnerFindAllUseCase;

describe('OwnerFindAllUseCase', () => {
  beforeEach(() => {
    ownerRepository = new OwnerInMemoryRepository();
    ownerFindAllUseCase = new OwnerFindAllUseCase(ownerRepository);
  });

  it('should be able to find all owners', async () => {
    const owner1 = await ownerRepository.create({
      name: 'Owner 1',
      description: 'Description 1',
      priceInCents: 10000,
      shopperId: randomUUID(),
    });

    const owner2 = await ownerRepository.create({
      name: 'Owner 2',
      description: 'Description 2',
      priceInCents: 20000,
      shopperId: randomUUID(),
    });

    const result = await ownerFindAllUseCase.execute();

    expect(result).toHaveLength(2);
    expect(result).toEqual([owner1, owner2]);
  });
});
