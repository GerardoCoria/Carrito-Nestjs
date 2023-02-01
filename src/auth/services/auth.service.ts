import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

import { UsersService } from "./../../users/services/users.service";
import { User } from "./../../users/entities/user.entity";
import { PayloadToken } from "./../models/token.model";

@Injectable()
export class AuthService {
  constructor(
    private userServices:UsersService,
    private jwtService:JwtService
  ){}

  async validateUser(email:string, password:string){
    const user = await this.userServices.findByEmail(email)
    const matchPassword = await bcrypt.compare(password, user.password);
    if(user && matchPassword){
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rta} = user.toJSON();
      return rta;
    }
    return null;
  }

  generateJWT(user:User){
    const payload:PayloadToken = {role:user.role, sub: user._id};
    return {
      access_token: this.jwtService.sign(payload),
      user,
    }
  }
}
