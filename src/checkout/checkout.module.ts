import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";

import { CheckoutController } from "./controllers/checkout.controller";
import { OrdersController } from './controllers/orders.controller';
import { Checkout, CheckoutSchema } from './entities/checkout.entity';
import { Order, OrderSchema } from './entities/order.entity';
import { CheckoutService } from "./services/checkout.service";
import { OrdersService } from './services/orders.service';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: Checkout.name,
        schema: CheckoutSchema
      },
      {
        name: Order.name,
        schema: OrderSchema
      }
    ])
  ],
  controllers:[CheckoutController, OrdersController],
  providers: [CheckoutService, OrdersService],
  exports:[CheckoutService, OrdersService]
})
export class CheckoutModule {}
