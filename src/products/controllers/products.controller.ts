import { Controller, Get, Param, Post, Body, Put, Delete} from '@nestjs/common';
import { ApiTags, ApiOperation } from "@nestjs/swagger";

import { ProductsService } from "../services/products.service";
//import { ParseIntPipe } from "../../common/parse-int.pipe"
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto'
import { MongoIdPipe } from "../../common/mongo-id/mongo-id.pipe";

@ApiTags('Productos')
@Controller('products')
export class ProductsController {

  constructor(private services: ProductsService){}

  @Get()
  @ApiOperation({summary:'Retorna todos los productos.'})
  getAll(){
    return this.services.findAll()
  }

  @Get(':id')
  @ApiOperation({summary:'Devuelve un producto por su N° de ID'})
  getById(@Param('id', MongoIdPipe) id: string){
    return this.services.findOne(id)
  }
  @Post()
  @ApiOperation({summary:'Agrega un producto nuevo'})
  create(@Body() payload:CreateProductDto){
    return this.services.create(payload)
  }

  @Put(':id')
  @ApiOperation({summary:'Modifica un producto en uno o más atributos.'})
  update(@Param('id', MongoIdPipe) id:string, @Body() payload:UpdateProductDto){
    return this.services.update(id, payload)
  }

  @Delete(':id')
  @ApiOperation({summary:'Elimina el producto seleccionado por su N° de ID'})
  borrar(@Param('id', MongoIdPipe) id:string){
    return this.services.remove(id)
  }
}
