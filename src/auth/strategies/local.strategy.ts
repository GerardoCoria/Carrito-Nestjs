import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./../services/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local'){
  constructor(private authSerive : AuthService){
    super();
  }

  async validate(email:string, password:string){
    const user = this.authSerive.validateUser(email, password);
    if(!user){
      throw new UnauthorizedException('No estás autorizado');
    }
    return user;
  }
}
