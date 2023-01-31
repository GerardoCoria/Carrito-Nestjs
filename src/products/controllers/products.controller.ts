import { Controller, Get, Param, Post, Body, Put, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

import { ProductsService } from "../services/products.service";
import { CreateProductDto, UpdateProductDto, FilterProductsDto } from '../dtos/products.dto'
import { MongoIdPipe } from "../../common/mongo-id/mongo-id.pipe";
//import { ApiKeyGuard } from "../../auth/guards/api-key.guard";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { Public } from "../../auth/decorators/public.decorator";

@ApiTags('Productos')
//@UseGuards(ApiKeyGuard)
@UseGuards(AuthGuard('jwt'))
@Controller('products')
export class ProductsController {

  constructor(private services: ProductsService){}

  @Get()
  @Public()
  @ApiOperation({summary:'Retorna todos los productos.'})
  getAll(@Query() params:FilterProductsDto){
    return this.services.findAll(params)
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
