import { Injectable, NotFoundException} from '@nestjs/common';

import { User } from '../entities/user.entity';
import { Order } from "../../cart/entities/order.entity";
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
      throw new NotFoundException(`Producto con ID N° ${id} no existe.`)
    }
    const index = this.products.findIndex((item)=>item.id===id)
    this.products[index] = {
      ...item,
      ...payload
    };
    return this.products[index]
  }
}
