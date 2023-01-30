import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateOrderDto, UpdateOrderDto, AddProductsToOrderDto } from '../dto/orders.dto';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel:Model<Order>
  ){}

  findAll() {
    return this.orderModel.find().populate('customer').populate('products').exec();
  }

  async findOne(id: string) {
    const order = await this.orderModel.findOne({ _id: id }).populate('customer').populate('products', {keys:0, stock:0}).exec();
    if (!order) {
      throw new NotFoundException(`No se encontró la orden #${id}.`);
    }
    return order;
  }

  create(data: CreateOrderDto) {
    const newOrder = new this.orderModel(data);
    return newOrder.save();
  }

  async update(id: string, changes: UpdateOrderDto) {
    const order = await this.orderModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!order) {
      throw new NotFoundException(`No se encontró la orden #${id}.`);
    }
    return order;
  }

  remove(id: string) {
    return this.orderModel.findByIdAndDelete(id);
  }

  async removeProduct(idOrder:string, idProduct:string){
    const order = await this.orderModel.findById(idOrder);
    order.products.pull(idProduct);
    return order.save();
  }

  async addProducts(idOrder:string, products:string[]){
    const order = await this.orderModel.findById(idOrder);
    products.forEach((item)=> order.products.push(item));
    return order.save()
  }
}
