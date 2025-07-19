import { describe, it, expect, beforeEach } from 'vitest';
import { UserInMemoryRepository } from '../../repositories/user.in-memory.repository';
import { UserDeleteUseCase } from './user-delete.use-case';

let userRepository: UserInMemoryRepository;
let userDeleteUseCase: UserDeleteUseCase;

describe('UserDeleteUseCase', () => {
  beforeEach(() => {
    userRepository = new UserInMemoryRepository();
    userDeleteUseCase = new UserDeleteUseCase(userRepository);
  });

  it('should be able to delete a user', async () => {
    const user = await userRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    });

    await userDeleteUseCase.execute(user.id);

    expect(userRepository.users).toHaveLength(0);
  });
});
