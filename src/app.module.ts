import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CheckoutModule } from './checkout/checkout.module';
import { DatabaseModule } from './database/database.module';
import { environments } from "./environments";
import { AuthModule } from './auth/auth.module';
import config from './config'

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: environments[process.env.NODE_ENV] || '.env',
    load:[config],
    isGlobal: true,
    validationSchema:Joi.object({
      PORT: Joi.number().required(),
      SWAGGER_USER: Joi.string().required(),
      SWAGGER_PASSWORD: Joi.string().required(),
      JWT_SECRET: Joi.string().required()
    })
  }), UsersModule, ProductsModule, OrdersModule, CheckoutModule, DatabaseModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {};
