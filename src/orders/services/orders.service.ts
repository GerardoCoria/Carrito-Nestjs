import { ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AuthService } from '../../auth/services/auth.service';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/orders.dto';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel:Model<Order>,
    private authService:AuthService
    ){}

  findAll() {
    return this.orderModel.find().populate('customer').populate('products').exec();
  }

  async ordersByCustomer(customerId: number) {
    return this.orderModel.find({customer: customerId}).populate('products').exec()
  };

  //async findOne(id: string) {
  //  const order = await this.orderModel.findOne({ _id: id }).populate('customer').populate('products', {keys:0, stock:0}).exec();
  //  if (!order) {
  //    throw new NotFoundException(`No se encontró la orden #${id}.`);
  //  }
  //  return order;
  //};

  /* async isInCart(orderId: string, productId:string){
    const order = await this.orderModel.findOne({_id: orderId}).exec();
    const product = order.products.find((item)=>item.id === productId);
    return product
  }; */

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

  async addProducts(idOrder:string, product:string, auth:string){
    const user:number = await this.authService.gettingUser(auth)
    const order:any = await this.orderModel.findById(idOrder).populate('products').exec();
    console.log('👉 order ▶',order.products);
    if(order.customer !== user){
      throw new ForbiddenException('No tiene los permisos para realizar esta acción.')
    }
    const isInCart = await order.products.find((item)=>item._id == product[0])
    if(isInCart){
      throw new HttpException('Producto ya ingresado', HttpStatus.BAD_REQUEST)
    }
    order.products.push(product);
    return order.save()
  }

  remove(id: string) {
    return this.orderModel.findByIdAndDelete(id);
  }

  async removeProduct(idOrder:string, idProduct:string){
    const order = await this.orderModel.findById(idOrder);
    order.products.pull(idProduct);
    return order.save();
  }
}
