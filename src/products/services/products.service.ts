import { Injectable, NotFoundException} from '@nestjs/common';
import { Model, FilterQuery } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { Product } from '../entities/product.entity'
import { CreateProductDto, UpdateProductDto, FilterProductsDto } from '../dtos/products.dto';

@Injectable()
export class ProductsService {

  constructor(
    @InjectModel(Product.name) private productModel:Model<Product>
  ){}

  findAll(params: FilterProductsDto){
    if(params){
      const filters:FilterQuery<Product> = {}
      const { limit, offset } = params;
      const { minPrice, maxPrice } = params;
      const { search } = params;
      if(minPrice && maxPrice){
        filters.price = {$gte: minPrice, $lte: maxPrice}
      }
      else if(search){
        filters.keys = { $regex : search, $options: 'i'}
      }
      return this.productModel.find(filters, {keys:0, stock: 0}).populate('brand').skip(offset).limit(limit).exec()
    }
    return this.productModel.find().populate('brand').exec();
  }

  async findOne(id:string){
    const item = await this.productModel.findById(id).populate('brand').exec()
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
