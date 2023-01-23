import { Injectable, NotFoundException } from '@nestjs/common';

import { NewItemDto, UpdateItemDto } from "../dtos/cart.dto";
import { Cart } from "../entities/cart.entity";

@Injectable()
export class CartService {
  private cart:Cart[] = []

  findOne(id:number){
    const item = this.cart.find((item:any)=>item.id ===id)
    if(!item){
      throw new NotFoundException(`Producto con ID N° ${id} no existe.`)
    }
    return item
  }

  create(payload:NewItemDto){
    if(!payload){
      throw new NotFoundException(`Error en los datos suministrados.`)
    }
    const newItem = {
      ...payload
    };
    this.cart.push(newItem);
    return newItem;
  }

  update(id:number, payload/* :UpdateItemDto */){
    const item = this.findOne(id)
    if(!item){
      throw new NotFoundException(`Producto con ID N° ${id} no existe.`)
    }
    const index = this.cart.findIndex((item)=>item.id===id)
    this.cart[index] = {
      ...payload
    };
    return this.cart[index]
  }

  remove(id:number){
    const index = this.cart.findIndex((item)=>item.id===id)
    if(index === -1){
      throw new NotFoundException(`Producto con ID N° ${id} no existe.`)
    }
    this.cart.splice(index, 1)
    return true
  }
}
