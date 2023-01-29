import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateCheckoutDto, UpdateCheckoutDto } from '../dto/checkout.dto';
import { Checkout } from '../entities/checkout.entity';

@Injectable()
export class CheckoutService {
  constructor(
    @InjectModel(Checkout.name) private checkoutModel:Model<Checkout>
  ){}

  findAll() {
    return this.checkoutModel.find().exec();
  }

  async findOne(id: string) {
    const checkout = await this.checkoutModel.findOne({ _id: id }).exec();
    if (!checkout) {
      throw new NotFoundException(`No se encontró la compra #${id}.`);
    }
    return checkout;
  }

  create(data: CreateCheckoutDto) {
    const newCheckout = new this.checkoutModel(data);
    return newCheckout.save();
  }

  async update(id: string, changes: UpdateCheckoutDto) {
    const checkout = await this.checkoutModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!checkout) {
      throw new NotFoundException(`No se encontró la  compra #${id}.`);
    }
    return checkout;
  }

  remove(id: string) {
    return this.checkoutModel.findByIdAndDelete(id);
  }
}
