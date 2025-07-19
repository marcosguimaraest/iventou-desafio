import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { IBaseUseCase } from 'src/common/interfaces';
import { CreateUserDto } from 'src/domain/dtos';
import { EmailAlreadyExistsError } from 'src/domain/errors/email-already-exists';
import { UserEntity } from 'src/domain/entities';
import { IUserRepository } from '../../repositories/iuser.repository';

@Injectable()
export class UserCreateUseCase
  implements IBaseUseCase<UserEntity, CreateUserDto>
{
  constructor(
    private readonly userRepository: IUserRepository
  ) {}

  async execute(data: CreateUserDto): Promise<UserEntity> {
    const emailAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (emailAlreadyExists) {
      throw new EmailAlreadyExistsError();
    }

    const hash = await bcrypt.hash(data.password, 6);

    const user = await this.userRepository.create({
      ...data,
      password: hash,
    });

    return user;
  }
}
