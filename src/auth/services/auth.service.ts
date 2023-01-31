import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersService } from "./../../users/services/users.service";

@Injectable()
export class AuthService {
  constructor(private userServices:UsersService){}

  async validateUser(email:string, password:string){
    const user = await this.userServices.findByEmail(email)
    const matchPassword = await bcrypt.compare(password, user.password);
    if(user && matchPassword){
      const { password, ...rta} = user.toJSON();
      return rta;
    }
    return null;
  }
}
