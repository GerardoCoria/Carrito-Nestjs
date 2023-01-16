import { Controller, Get } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get('categories')
  categorias(){
    return `categorias`;
  }
}
