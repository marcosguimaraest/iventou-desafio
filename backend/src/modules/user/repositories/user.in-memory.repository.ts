import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/domain/entities';
import { CreateUserDto } from 'src/domain/dtos';
import { IUserRepository } from './iuser.repository';
import { randomUUID } from 'crypto';

@Injectable()
export class UserInMemoryRepository extends IUserRepository {
  public users: UserEntity[] = [];

  async create<T>(createDto: T): Promise<UserEntity> {
    const user: UserEntity = {
      ...(createDto as any),
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(user);
    return user;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = this.users.find((user) => user.email === email);

    return user || null;
  }

  async findById(id: string): Promise<UserEntity> {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      return null as any;
    }

    return user;
  }

  async findAll(): Promise<UserEntity[]> {
    return this.users;
  }

  async delete(id: string): Promise<UserEntity> {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return null as any;
    }

    const deletedUser = this.users[userIndex];
    this.users.splice(userIndex, 1);

    return deletedUser;
  }
}
