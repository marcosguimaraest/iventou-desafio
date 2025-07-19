import { describe, it, expect, beforeEach } from 'vitest';
import { UserInMemoryRepository } from '../../repositories/user.in-memory.repository';
import { UserFindAllUseCase } from './user-find-all.use-case';

let userRepository: UserInMemoryRepository;
let userFindAllUseCase: UserFindAllUseCase;

describe('UserFindAllUseCase', () => {
  beforeEach(() => {
    userRepository = new UserInMemoryRepository();
    userFindAllUseCase = new UserFindAllUseCase(userRepository);
  });

  it('should be able to find all users', async () => {
    const user1 = await userRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    });

    const user2 = await userRepository.create({
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: '123456',
    });

    const result = await userFindAllUseCase.execute();

    expect(result).toHaveLength(2);
    expect(result).toEqual([user1, user2]);
  });
});
