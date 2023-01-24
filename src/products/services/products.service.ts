import { /* Inject, */ Injectable, NotFoundException} from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
/* import { Db } from "mongodb"; */

import { Product } from '../entities/product.entity'
/* import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';*/

@Injectable()
export class ProductsService {
  /* private counterId = 0
  private products: Product[] = [];
  constructor(
    @Inject('dolar')private dolar:any,
    @Inject('MONGO') private database:Db,
  ){} */
  constructor(
    @InjectModel(Product.name) private productModel:Model<Product>
  ){}

  findAll(){
    return this.productModel.find().exec();
  }

  async findOne(id:string){
    const item = await this.productModel.findById(id).exec()
    /* .find((item:any)=>item.id ===id) */
    if(!item){
      throw new NotFoundException(`Producto con ID N° ${id} no existe.`)
    }
    return item
  }
  /*

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
  */
}
