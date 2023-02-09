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
    return this.orderModel.find().populate('products').populate('customer').exec();
  }

  async ordersByCustomer(customerId: number) {
    return this.orderModel.find({customer: customerId}).populate('products').exec()
  };

  async oneOrderByCustomer(user:number, id: string){
    const orders = await this.ordersByCustomer(user)
    const order = orders.find((i)=>i._id == id)
    return order;
  }

  async oneItemFromOrder(user:number, id:string, idProduct:string){
    const order = await this.oneOrderByCustomer(user, id)
    const product = order.products.find((i)=> i._id == idProduct)
    //const product = order.products.find((i)=> i.item._id == idProduct)
    return product;
  }

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

  async addProducts(idOrder:string, product:string, qty:number, auth:string){
    console.log('👉 product ▶',product );
    console.log('👉 qty ▶',qty );
    const user:number = await this.authService.gettingUser(auth)
    const order:any = await this.orderModel.findById(idOrder).populate('products').exec();
    if(order.customer !== user){
      throw new ForbiddenException('No tiene los permisos para realizar esta acción.')
    }
    console.log('👉 order ▶', order.products );
    const isInCart = await order.products.find((i)=>i._id == product[0])
    console.log('👉 isin ▶', isInCart);
    if(isInCart){
      throw new HttpException('Producto ya ingresado', HttpStatus.BAD_REQUEST)
      //isInCart.stock = 6;
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
