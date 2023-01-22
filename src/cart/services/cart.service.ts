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
// getById(id:number){
//   const userFound = this.findOne(id)
//   return {
//     date: new Date(),
//     user: userFound,
//     products: this.products.findAll()
//   }
// }
// @Get('/cart/:id')
// getCartById(@Param('id', ParseIntPipe) id:number){
//   return this.services.getById(id)
// }
