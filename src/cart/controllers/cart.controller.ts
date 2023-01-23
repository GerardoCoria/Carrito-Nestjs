import { Controller, Get, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from "@nestjs/swagger";

import { ParseIntPipe } from 'src/common/parse-int.pipe';
import { CartService } from "../services/cart.service";
import { NewItemDto, UpdateItemDto } from "../dtos/cart.dto";

@ApiTags('Carrito')
@Controller('cart')
export class CartController {
  constructor(private services:CartService){}

  @Get(':id')
  @ApiOperation({summary:'Muestra un producto del carrito por su N° de ID'})
  recibirParams(@Param('id', ParseIntPipe) id: number){
    return this.services.findOne(id)
  }

  @Post()
  @ApiOperation({summary:'Agrega un producto nuevo al carrito'})
  create(@Body() payload:NewItemDto){
    return this.services.create(payload)
  }

  @Put(':id')
  @ApiOperation({summary:'Modifica un producto del carrito en uno o más atributos.'})
  update(@Param('id', ParseIntPipe) id:number, @Body() payload:UpdateItemDto){
    return this.services.update(id, payload)
  }

  @Delete(':id')
  @ApiOperation({summary:'Elimina el producto del carrito por su N° de ID'})
  borrar(@Param('id', ParseIntPipe) id:number){
    return this.services.remove(id)
  }
}
