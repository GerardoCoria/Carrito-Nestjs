import { Controller, Get, Body, Param, Post, Put, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateOrderDto, UpdateOrderDto, AddProductsToOrderDto } from '../dto/orders.dto';
import { OrdersService } from '../services/orders.service';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateOrderDto) {
    return this.orderService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateOrderDto) {
    return this.orderService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }

  @Delete(':id/item/:itemId')
  removeProduct(@Param('id') id: string, @Param('itemId') itemId:string) {
    return this.orderService.removeProduct(id, itemId);
  }

  @Put(':id/items')
  updateProducts(@Param('id') id: string, @Body() payload: AddProductsToOrderDto) {
    return this.orderService.addProducts(id, payload.products);
  }
}
