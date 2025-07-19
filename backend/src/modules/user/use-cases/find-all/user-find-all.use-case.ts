import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../repositories/iuser.repository';
import { UserEntity } from 'src/domain/entities';
import { IBaseUseCase } from 'src/common/interfaces';

@Injectable()
export class UserFindAllUseCase
  implements IBaseUseCase<UserEntity[], null>
{
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(): Promise<UserEntity[]> {
    const user = await this.userRepository.findAll();

    return user;
  }
}
