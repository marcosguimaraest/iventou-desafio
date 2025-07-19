import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ShopperEntity } from 'src/domain/entities';
import { IShopperRepository } from './ishopper.repository';

@Injectable()
export class ShopperInMemoryRepository extends IShopperRepository {
  private shopper: ShopperEntity[] = [];

  async create<T>(createDto: T): Promise<ShopperEntity> {
    const shopper: ShopperEntity = {
      ...(createDto as any),
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.shopper.push(shopper);
    return shopper;
  }

  async findByEmail(email: string): Promise<ShopperEntity | null> {
    const shopper = this.shopper.find((shopper) => shopper.email === email);

    return shopper || null;
  }

  async findById(id: string): Promise<ShopperEntity> {
    const shopper = this.shopper.find((shopper) => shopper.id === id);

    if (!shopper) {
      throw new Error('shopper not found');
    }

    return shopper;
  }

  async findAll(): Promise<ShopperEntity[]> {
    return this.shopper;
  }

  async delete(id: string): Promise<ShopperEntity> {
    const shopperIndex = this.shopper.findIndex((shopper) => shopper.id === id);

    if (shopperIndex === -1) {
      throw new Error('shopper not found');
    }

    const deletedshopper = this.shopper[shopperIndex];
    this.shopper.splice(shopperIndex, 1);

    return deletedshopper;
  }
}
