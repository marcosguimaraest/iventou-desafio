import { Injectable } from '@nestjs/common';
import { IUserRepository } from './iuser.repository';

@Injectable()
export class UserRepository extends IUserRepository {}
