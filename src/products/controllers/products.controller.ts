import { Controller, Get, Param, Post, Body, Put, Delete/* ,ParseIntPipe */} from '@nestjs/common';
import { ProductsService } from "../services/products.service";
import { ParseIntPipe } from "../../common/parse-int.pipe"
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto'

@Controller('products')
export class ProductsController {

  constructor(private services: ProductsService){}

  @Get()
  rutaPrincipal(){
    return this.services.findAll()
  }

  @Get(':id')
  recibirParams(@Param('id', ParseIntPipe) id: number){
    return this.services.findOne(id)
  }

  @Post()
  create(@Body() payload:CreateProductDto){
    return this.services.create(payload)
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id:number, @Body() payload:UpdateProductDto){
    return this.services.update(id, payload)
  }

  @Delete(':id')
  borrar(@Param('id', ParseIntPipe) id:number){
    return this.services.remove(id)
  }
}
