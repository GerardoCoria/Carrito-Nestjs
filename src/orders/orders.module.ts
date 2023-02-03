import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersController } from './controllers/orders.controller';

import { AuthModule } from '../auth/auth.module';
import { Order, OrderSchema } from './entities/order.entity';
import { OrdersService } from './services/orders.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema
      }
    ])
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService]
})
export class OrdersModule {}
