import { Injectable } from '@nestjs/common';
import { ProductEntity } from 'src/domain/entities';
import { IProductRepository } from './iproduct.repository';
import { randomUUID } from 'crypto';

@Injectable()
export class ProductInMemoryRepository extends IProductRepository {
  public products: ProductEntity[] = [];

  async create<T>(createDto: T): Promise<ProductEntity> {
    const product: ProductEntity = {
      ...(createDto as any),
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    this.products.push(product);
    return product;
  }

  async findById(id: string): Promise<ProductEntity> {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  }
  
  async findAll(): Promise<ProductEntity[]> {
    return this.products;
  }

  async delete(id: string): Promise<ProductEntity> {
    const productIndex = this.products.findIndex((product) => product.id === id);

    if (productIndex === -1) {
      throw new Error('Product not found');
    }

    const deletedProduct = this.products[productIndex];
    this.products.splice(productIndex, 1);
    
    return deletedProduct;
  }
}
