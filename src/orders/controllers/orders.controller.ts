import { Controller, Get, Body, Param, Post, Put, Delete, UseGuards, Headers } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateOrderDto, UpdateOrderDto, AddProductsToOrderDto } from '../dtos/orders.dto';
import { OrdersService } from "../services/orders.service";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../../auth/guards/roles.guard";
import { Roles } from "../../auth/decorators/roles.decorator";
import { Role } from "../../auth/models/roles.model";

@ApiTags('Orders')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Get()
  @Roles(Role.ADMIN && Role.OWNER)
  @ApiOperation({summary: "Devuelve todas las órdenes."})
  findAll() {
    return this.orderService.findAll();
  }

  /* @Get(':id')
  @ApiOperation({summary: "Devuelve una orden por su ID."})
  get(@Param('id') id: string) {
    return this.orderService.findOne(id);
  } */

  //PUERBAAAAAA
  /* @Get('prueba')
  gete(@Req() req: Request){
    const user = req.user as PayloadToken;
    return this.orderService.prueba(user.sub)
  } */

  @Post()
  @ApiOperation({summary: "Genera una nueva orden."})
  create(@Body() payload: CreateOrderDto) {
    return this.orderService.create(payload);
  }

  @Put(':id')
  @ApiOperation({summary: "Modifica los datos de la orden de compra relacionada con el usuario, como el nombre de la misma."})
  update(@Param('id') id: string, @Body() payload: UpdateOrderDto) {
    return this.orderService.update(id, payload);
  }

  @Put(':id/items')
  @ApiOperation({summary: "Toma el ID de la orden de compra, busca es orden y la modifica, agregándole productos."})
  updateProducts(@Param('id') id: string, @Body() payload: AddProductsToOrderDto, @Headers('Authorization') auth: string) {
    return this.orderService.addProducts(id, payload.products, auth);
  }

  @Delete(':id')
  @ApiOperation({summary: "Elimina la orden de compra relacionada con el usuario."})
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }

  @Delete(':id/item/:itemId')
  @ApiOperation({summary: "Elimina un producto de la orden de compra del usuario."})
  removeProduct(@Param('id') id: string, @Param('itemId') itemId:string) {
    return this.orderService.removeProduct(id, itemId);
  }
}
