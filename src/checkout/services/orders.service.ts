import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateOrderDto, UpdateOrderDto } from '../dto/orders.dto';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel:Model<Order>
  ){}

  findAll() {
    return this.orderModel.find().exec();
  }

  async findOne(id: string) {
    const order = await this.orderModel.findOne({ _id: id }).exec();
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
}
