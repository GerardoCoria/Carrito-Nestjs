import { Controller, Get,Param, Body, Post, Put, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from "@nestjs/swagger";

import { CheckoutService } from "../services/checkout.service";

@ApiTags('Checkout')
@Controller('checkout')
export class CheckoutController {
  constructor(private checkoutService: CheckoutService) {}

  @Get()
  findAll() {
    return this.checkoutService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary:'Muestra un producto del carrito por su N° de ID'})
  get(@Param('id') id: string) {
    return this.cartService.findOne(id);
  }

  @Post()
  @ApiOperation({summary:'Agrega un producto nuevo al carrito'})
  create(@Body() payload: CreateCartDto) {
    return this.checkoutService.create(payload);
  }

  @Put(':id')
  @ApiOperation({summary:'Modifica un producto del carrito en uno o más atributos.'})
  update(@Param('id') id: string, @Body() payload: UpdateCartDto) {
    return this.checkoutService.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({summary:'Elimina el producto del carrito por su N° de ID'})
  remove(@Param('id') id: string) {
    return this.checkoutService.remove(id);
  }
}
