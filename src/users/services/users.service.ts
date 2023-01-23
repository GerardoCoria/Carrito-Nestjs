import { Injectable, NotFoundException} from '@nestjs/common';

import { User } from '../entities/user.entity';
import { ProductsService } from "../../products/services/products.service";

@Injectable()
export class UsersService {
  private counterId = 0
  private users: User[] = [];
  constructor(private products:ProductsService){}

  findOne(id:number):User | void{
    const user = this.users.find((item)=>item.id === id)
    if(!user){
      throw new NotFoundException(`Usuario con ID N° ${id} no está registrado`)
    }
  }

  create(payload:User){
    if(!payload){
      throw new NotFoundException(`Error en los datos suministrados.`)
    }
    this.counterId = this.counterId + 1
    const newUser ={
      id: this.counterId,
      ...payload
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id:number, payload:User){
    const item = this.findOne(id)
    if(!item){
      throw new NotFoundException(`Usuario con ID N° ${id} no existe.`)
    }
    const index = this.users.findIndex((item)=>item.id===id)
    this.users[index] = {
      ...item,
      ...payload
    };
    return this.users[index]
  }

  remove(id:number){
    const index = this.users.findIndex((item)=>item.id===id)
    if(index === -1){
      throw new NotFoundException(`Usuario con ID N° ${id} no existe.`)
    }
    this.users.splice(index, 1)
    return true
  }


}
