import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Cart } from "../entities/cart.entity";
import { CreateCartDto, UpdateCartDto } from "../dtos/cart.dto";

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel:Model<Cart>
  ){}

  findAll() {
    return this.cartModel.find().exec();
  }

  async findOne(id: string) {
    const cart = await this.cartModel.findOne({ _id: id }).exec();
    if (!cart) {
      throw new NotFoundException(`No se encontró el carrito #${id}.`);
    }
    return cart;
  }

  create(data: CreateCartDto) {
    const newCart = new this.cartModel(data);
    return newCart.save();
  }

  async update(id: string, changes: UpdateCartDto) {
    const cart = await this.cartModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!cart) {
      throw new NotFoundException(`No se encontró la  marca #${id}.`);
    }
    return cart;
  }

  remove(id: string) {
    return this.cartModel.findByIdAndDelete(id);
  }
}
