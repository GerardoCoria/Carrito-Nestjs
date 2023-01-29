import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CartController } from "./controllers/cart.controller";
import { CustomersController } from './controllers/customers.controller';
import { Cart, CartSchema } from './entities/cart.entity';
import { Customer, CustomerSchema } from './entities/customer.entity';
import { CartService } from "./services/cart.service";
import { CustomersService } from './services/customers.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Cart.name,
        schema: CartSchema
      },
      {
        name:Customer.name,
        schema: CustomerSchema
      }
    ])
  ],
  controllers: [CartController, CustomersController],
  providers: [CartService, CustomersService],
  exports: [CartService, CustomersService]
})
export class CartModule {}
