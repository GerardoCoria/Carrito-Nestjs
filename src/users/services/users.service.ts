import { Injectable, NotFoundException} from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Order } from "../../cart/entities/order.entity";
import { ProductsService } from "../../products/services/products.service";

@Injectable()
export class UsersService {

  private users: User[] = [];
  constructor(private products:ProductsService){}

  ruta(){
    return {message: 'Ruta de users'}
  }

  findOne(id:number):User | void{
    const user = this.users.find((item)=>item.id === id)
    if(!user){
      throw new NotFoundException(`Usuario con ID N° ${id} no está registrado`)
    }
  }

  getById(id:number){
    const userFound = this.findOne(id)
    return {
      date: new Date(),
      user: userFound,
      products: this.products.findAll()
    }
  }

}
