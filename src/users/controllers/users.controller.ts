import { Controller, Get, Param } from '@nestjs/common';
import { ParseIntPipe } from 'src/common/parse-int.pipe';
import { UsersService } from "../services/users.service";

@Controller('users')
export class UsersController {

  constructor(private services:UsersService){}

  @Get()
  ruta(){
    return this.services.ruta()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id:number){
    return this.services.findOne(id)
  }

  @Get('/cart/:id')
  getCartById(@Param('id', ParseIntPipe) id:number){
    return this.services.getById(id)
  }
}
