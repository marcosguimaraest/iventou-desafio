import { Injectable } from '@nestjs/common';
import { IUserRepository } from './iuser.repository';
import { UserEntity } from 'src/domain/entities';

@Injectable()
export class UserPrismaRepository extends IUserRepository {
  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async findUserWithOrdersAndItems(id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
      include: {
        orders: {
          include: {
            orderItems: true
          }
        }
      }
    });
  }
}
