import { Injectable } from '@nestjs/common';
import { Product } from "../../products/entities/product.entity";
@Injectable()
export class CartService {
  private cart:Product[] = []
  ruta(){
    return {message: 'Ruta de Cart'}
  }
  getAll(){
    return this.cart
  }

  create(payload){
    return this.cart.push(payload)
  }

  update(id, payload){
    return this.cart
  }

  delete(id){
    return this.cart
  }
}
