import { describe, it, expect, beforeEach } from 'vitest';
import { randomUUID } from 'crypto';
import { OwnerInMemoryRepository } from '../../repositories/owner.in-memory.repository';
import { OwnerFindOneByIdUseCase } from './owner-find-one-by-id.use-case';

let ownerRepository: OwnerInMemoryRepository;
let ownerFindOneByIdUseCase: OwnerFindOneByIdUseCase;

describe('ownerFindOneByIdUseCase', () => {
  beforeEach(() => {
    ownerRepository = new OwnerInMemoryRepository();
    ownerFindOneByIdUseCase = new OwnerFindOneByIdUseCase(ownerRepository);
  });

  it('should be able to find a owner by id', async () => {
    const owner = await ownerRepository.create({
      name: 'owner 1',
      description: 'Description 1',
      priceInCents: 10000,
      shopperId: randomUUID(),
    });

    const result = await ownerFindOneByIdUseCase.execute(owner.id);

    expect(result).toEqual(owner);
  });
});
