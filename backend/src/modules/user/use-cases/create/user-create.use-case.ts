import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../repositories/iuser.repository';
import { UserEntity } from 'src/domain/entities';
import { IBaseUseCase } from 'src/common/interfaces';
import { CreateUserDto } from 'src/domain/dtos';

@Injectable()
export class UserCreateUseCase
  implements IBaseUseCase<UserEntity, CreateUserDto>
{
  constructor(
    private readonly userRepository: IUserRepository
  ) {}

  async execute(data: CreateUserDto): Promise<UserEntity> {
    const user = await this.userRepository.create(data);

    return user;
  }
}
