import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from "express";
import { AuthGuard } from "@nestjs/passport";

import { AuthService } from "./../services/auth.service";
import { User } from "./../../users/entities/user.entity";
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {

  constructor(private authService:AuthService){}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({summary:'Ruta para loguearse al sistema.'})
  login(@Req() req:Request){
    const user = req.user as User;
    return this.authService.generateJWT(user);
  }
}
