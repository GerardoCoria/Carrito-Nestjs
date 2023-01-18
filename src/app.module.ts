import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { CheckoutModule } from './checkout/checkout.module';

import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, ProductsModule, CartModule, CheckoutModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
