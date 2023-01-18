import { Inject, Injectable, NotFoundException} from '@nestjs/common';

import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
import { Product } from '../entities/product.entity'

@Injectable()
export class ProductsService {
  private counterId = 0
  private products: Product[] = [];
  constructor(@Inject('dolar')private dolar:any){}

  findAll(){
    return {
      products: this.products,
      dolar: this.dolar
    }
  }

  findOne(id:number){
    const item = this.products.find((item:any)=>item.id ===id)
    if(!item){
      throw new NotFoundException(`Producto con ID N° ${id} no existe.`)
    }
    return item
  }

  create(payload:CreateProductDto){
    if(!payload){
      throw new NotFoundException(`Error en los datos suministrados.`)
    }
    this.counterId = this.counterId + 1
    const newProduct ={
      id: this.counterId,
      ...payload
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id:number, payload:UpdateProductDto){
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

  remove(id:number){
    const index = this.products.findIndex((item)=>item.id===id)
    if(index === -1){
      throw new NotFoundException(`Producto con ID N° ${id} no existe.`)
    }
    this.products.splice(index, 1)
    return true
  }
}
