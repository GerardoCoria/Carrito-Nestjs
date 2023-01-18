import { Controller, Get, Param, Post, Body, Put, Delete} from '@nestjs/common';
import { ApiTags, ApiOperation } from "@nestjs/swagger";

import { ProductsService } from "../services/products.service";
import { ParseIntPipe } from "../../common/parse-int.pipe"
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto'

@ApiTags('Productos')
@Controller('products')
export class ProductsController {

  constructor(private services: ProductsService){}

  @Get()
  @ApiOperation({summary:'Retorna todos los productos.'})
  rutaPrincipal(){
    return this.services.findAll()
  }

  @Get(':id')
  @ApiOperation({summary:'Devuelve un producto por su N° de ID'})
  recibirParams(@Param('id', ParseIntPipe) id: number){
    return this.services.findOne(id)
  }

  @Post()
  @ApiOperation({summary:'Agrega un producto nuevo'})
  create(@Body() payload:CreateProductDto){
    return this.services.create(payload)
  }

  @Put(':id')
  @ApiOperation({summary:'Modifica un producto en uno o más atributos.'})
  update(@Param('id', ParseIntPipe) id:number, @Body() payload:UpdateProductDto){
    return this.services.update(id, payload)
  }

  @Delete(':id')
  @ApiOperation({summary:'Elimina el producto seleccionado por su N° de ID'})
  borrar(@Param('id', ParseIntPipe) id:number){
    return this.services.remove(id)
  }
}
