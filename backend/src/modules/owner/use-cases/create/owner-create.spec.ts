import { describe, it, expect, beforeEach } from 'vitest';
import { OwnerInMemoryRepository } from '../../repositories/owner.in-memory.repository';
import { OwnerCreateUseCase } from './owner-create.use-case';
import { CreateOwnerDto } from 'src/domain/dtos';

let ownerRepository: OwnerInMemoryRepository;
let ownerCreateUseCase: OwnerCreateUseCase;

describe('OwnerCreateUseCase', () => {
  beforeEach(() => {
    ownerRepository = new OwnerInMemoryRepository();
    ownerCreateUseCase = new OwnerCreateUseCase(ownerRepository);
  });

  it('should be able to create a new owner', async () => {
    const createOwnerDto: CreateOwnerDto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    };

    const result = await ownerCreateUseCase.execute(createOwnerDto);

    expect(result).toBeDefined();
    expect(result.id).toEqual(expect.any(String));
  });
});
