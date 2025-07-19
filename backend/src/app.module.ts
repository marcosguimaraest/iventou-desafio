import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './infra/database/prisma/prisma.module';
import { ShopperModule } from './modules/shopper/shopper.module';
import { ProductModule } from './modules/product/product.module';
import { OwnerModule } from './modules/owner/owner.module';
import { EventModule } from './modules/event/event.module';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    ShopperModule,
    ProductModule,
    OwnerModule,
    EventModule,
  ],
})
export class AppModule {}
