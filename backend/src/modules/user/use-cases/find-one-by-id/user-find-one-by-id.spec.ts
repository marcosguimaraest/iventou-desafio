import { describe, it, expect, beforeEach } from 'vitest';
import { UserInMemoryRepository } from '../../repositories/user.in-memory.repository';
import { UserFindOneByIdUseCase } from './user-find-one-by-id.use-case';

let userRepository: UserInMemoryRepository;
let userFindOneByIdUseCase: UserFindOneByIdUseCase;

describe('UserFindOneByIdUseCase', () => {
  beforeEach(() => {
    userRepository = new UserInMemoryRepository();
    userFindOneByIdUseCase = new UserFindOneByIdUseCase(userRepository);
  });

  it('should be able to find a user by id', async () => {
    const user = await userRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    });

    const result = await userFindOneByIdUseCase.execute(user.id);

    expect(result).toEqual(user);
  })
});
