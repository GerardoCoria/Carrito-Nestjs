import { /* Inject, */ Injectable, NotFoundException} from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
/* import { Db } from "mongodb"; */

import { Product } from '../entities/product.entity'
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';

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

  create(payload:CreateProductDto){
    const newProduct = new this.productModel(payload);
    return newProduct.save();
  }

  update(id:string, payload:UpdateProductDto){
    const item = this.productModel
      .findByIdAndUpdate(id, {$set: payload}, {new:true})
      .exec();
    if(!item){
      throw new NotFoundException(`Producto con ${id} no existe`)
    }
    return item;
  }

  remove(id:string){
    return this.productModel.findByIdAndDelete(id)
  }
}
