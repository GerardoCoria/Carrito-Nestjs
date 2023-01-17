import { Controller, Get, Param, Post, Body, Put, Delete, ParseIntPipe} from '@nestjs/common';
import { ProductsService } from "../services/products.service";

@Controller('products')
export class ProductsController {

  constructor(private productsService: ProductsService){}

  @Get()
  rutaPrincipal(){
    return this.productsService.findAll()
  }

  @Get(':id')
  recibirParams(@Param('id', ParseIntPipe) id: number){
    return this.productsService.findOne(id)
  }

  @Post()
  create(@Body() payload:any){
    return this.productsService.create(payload)
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id:number, @Body() payload:any){
    return this.productsService.update(id, payload)
  }

  @Delete(':id')
  borrar(@Param('id', ParseIntPipe) id:number){
    return this.productsService.remove(id)
  }
}
