import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  obtenerUsuario(){
    return {
      message: "usuario 1"
    }
  }
}
