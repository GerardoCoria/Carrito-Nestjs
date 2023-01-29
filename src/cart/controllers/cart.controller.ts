import { Controller, Get, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from "@nestjs/swagger";

import { CreateCartDto, UpdateCartDto } from '../dtos/cart.dto';
import { CartService } from '../services/cart.service';

@ApiTags('Carrito')
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary:'Muestra un producto del carrito por su N° de ID'})
  get(@Param('id') id: string) {
    return this.cartService.findOne(id);
  }

  @Post()
  @ApiOperation({summary:'Agrega un producto nuevo al carrito'})
  create(@Body() payload: CreateCartDto) {
    return this.cartService.create(payload);
  }

  @Put(':id')
  @ApiOperation({summary:'Modifica un producto del carrito en uno o más atributos.'})
  update(@Param('id') id: string, @Body() payload: UpdateCartDto) {
    return this.cartService.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({summary:'Elimina el producto del carrito por su N° de ID'})
  remove(@Param('id') id: string) {
    return this.cartService.remove(id);
  }
}
