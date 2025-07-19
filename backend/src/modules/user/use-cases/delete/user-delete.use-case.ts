import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../repositories/iuser.repository';
import { UserEntity } from 'src/domain/entities';
import { IBaseUseCase } from 'src/common/interfaces';
import { UserFindOneByIdUseCase } from '../find-one-by-id/user-find-one-by-id.use-case';

@Injectable()
export class UserDeleteUseCase implements IBaseUseCase<UserEntity, string> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly userFindOneByIdUseCase: UserFindOneByIdUseCase,
  ) {}

  async execute(id: string): Promise<UserEntity> {
    await this.userFindOneByIdUseCase.execute(id);

    const user = await this.userRepository.delete(id);

    return user;
  }
}
