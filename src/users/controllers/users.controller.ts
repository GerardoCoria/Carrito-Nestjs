import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from "@nestjs/swagger";

import { ParseIntPipe } from 'src/common/parse-int.pipe';
import { User } from '../entities/user.entity';
import { UsersService } from "../services/users.service";

@ApiTags('Usuarios')
@Controller('users')
export class UsersController {

  constructor(private services:UsersService){}

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id:number){
    return this.services.findOne(id)
  }

  @Post()
  @ApiOperation({summary:'Registra un nuevo usuario'})
  create(@Body() payload:User){
    return this.services.create(payload)
  }


}
