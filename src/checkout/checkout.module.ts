import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";

import { CheckoutController } from "./controllers/checkout.controller";
import { Checkout, CheckoutSchema } from './entities/checkout.entity';
import { CheckoutService } from "./services/checkout.service";

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: Checkout.name,
        schema: CheckoutSchema
      }
    ])
  ],
  controllers:[CheckoutController],
  providers: [CheckoutService],
  exports:[CheckoutService]
})
export class CheckoutModule {}
