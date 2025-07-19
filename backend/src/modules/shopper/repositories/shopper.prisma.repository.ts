import { Injectable } from '@nestjs/common';
import { ShopperEntity } from 'src/domain/entities';
import { IShopperRepository } from './ishopper.repository';

@Injectable()
export class ShopperPrismaRepository extends IShopperRepository {
  async findByEmail(email: string): Promise<ShopperEntity | null> {
    const shopper = await this.prismaService.shopper.findUnique({
      where: { email },
    });

    if (!shopper) {
      return null;
    }

    return shopper;
  }
}
