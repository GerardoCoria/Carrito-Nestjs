import { Body, Controller, Get, Param, Post, Put, Delete} from '@nestjs/common';
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
  @ApiOperation({summary:'Agrega un usuario nuevo'})
  create(@Body() payload:User){
    return this.services.create(payload)
  }

  @Put(':id')
  @ApiOperation({summary:'Modifica un usuario en uno o más atributos.'})
  update(@Param('id', ParseIntPipe) id:number, @Body() payload:User){
    return this.services.update(id, payload)
  }

  @Delete(':id')
  @ApiOperation({summary:'Elimina el usuario seleccionado por su N° de ID'})
  borrar(@Param('id', ParseIntPipe) id:number){
    return this.services.remove(id)
  }
}
