import { Controller, Get } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get()
  categorias(){
    return `ruta de categorias`;
  }
}
