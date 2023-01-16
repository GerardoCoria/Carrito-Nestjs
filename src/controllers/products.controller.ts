import { Controller, Get, Param } from '@nestjs/common';

@Controller('products')
export class ProductsController {

  @Get()
  rutaPrincipal(){
    return `ruta de productos`
  }

  @Get(':id')
  recibirParams(@Param('id') id: string){
    return id;
  }
}
