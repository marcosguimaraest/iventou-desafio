import { describe, it, expect, beforeEach } from 'vitest';
import { UserInMemoryRepository } from '../../repositories/user.in-memory.repository';
import { UserCreateUseCase } from './user-create.use-case';
import { CreateUserDto } from 'src/domain/dtos';

let userRepository: UserInMemoryRepository;
let userCreateUseCase: UserCreateUseCase;

describe('UserCreateUseCase', () => {
  beforeEach(() => {
    userRepository = new UserInMemoryRepository();
    userCreateUseCase = new UserCreateUseCase(userRepository);
  });

  it('should be able to create a new user', async () => {
    const createUserDto: CreateUserDto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    };

    const result = await userCreateUseCase.execute(createUserDto);

    expect(result).toBeDefined();
    expect(result.id).toEqual(expect.any(String));
  });
});
