import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';

@Controller('products')
export class ProductsController {

  @Get()
  rutaPrincipal(){
    return {
      message: `ruta de productos`
  }
  }

  @Get(':id')
  recibirParams(@Param('id') id: string){
    return id;
  }

  @Post()
  create(@Body() payload:any){
    return {
      message: 'dato creado',
      data: payload
    }
  }

  @Put(':id')
  update(@Param('id')id:any, @Body() payload:any){
    return {
      id: id,
      data: payload
    }
  }

  @Delete(':id')
  borrar(@Param('id')id:any){
    return{
      message: `producto con id ${id} borrado`
    }
  }
}
