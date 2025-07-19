import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../repositories/iuser.repository';
import { UserEntity } from 'src/domain/entities';
import { IBaseUseCase } from 'src/common/interfaces';
import { ResourceNotFoundError } from 'src/domain/errors/resource-not-found';

@Injectable()
export class UserFindOneByIdUseCase
  implements IBaseUseCase<UserEntity, string>
{
  constructor(
    private readonly userRepository: IUserRepository
  ) {}

  async execute(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findUserWithOrdersAndItems(id);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return user;
  }
}
