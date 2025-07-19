import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../repositories/iuser.repository';
import { UserEntity } from 'src/domain/entities';
import { IBaseUseCase } from 'src/common/interfaces';
import { UserFindOneByIdUseCase } from '../find-one-by-id/user-find-one-by-id.use-case';
import { UpdateUserDto } from 'src/domain/dtos';

@Injectable()
export class UserUpdateUseCase
  implements IBaseUseCase<UserEntity, UpdateUserDto>
{
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly userFindOneByIdUseCase: UserFindOneByIdUseCase,
  ) {}

  async execute(data: UpdateUserDto): Promise<UserEntity> {
    await this.userFindOneByIdUseCase.execute(data.id);

    const update = await this.userRepository.update(data);

    return update;
  }
}
