import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ShopperEntity } from 'src/domain/entities';
import { IShopperRepository } from './ishopper.repository';

@Injectable()
export class ShopperInMemoryRepository extends IShopperRepository {
  public shopper: ShopperEntity[] = [];

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
      return null as any;
    }

    return shopper;
  }

  async findAll(): Promise<ShopperEntity[]> {
    return this.shopper;
  }

  async delete(id: string): Promise<ShopperEntity> {
    const shopperIndex = this.shopper.findIndex((shopper) => shopper.id === id);

    if (shopperIndex === -1) {
      return null as any;
    }

    const deletedshopper = this.shopper[shopperIndex];
    this.shopper.splice(shopperIndex, 1);

    return deletedshopper;
  }

  async findShopperWithProducts(shopperId: string): Promise<any> {
    const shopper = this.shopper.find((shopper) => shopper.id === shopperId);
    if (!shopper) {
      return null;
    }
    return { ...shopper, products: [] };
  }

  async findShopperWithEvents(shopperId: string): Promise<any> {
    const shopper = this.shopper.find((shopper) => shopper.id === shopperId);
    if (!shopper) {
      return null;
    }
    return { ...shopper, events: [] };
  }
}
