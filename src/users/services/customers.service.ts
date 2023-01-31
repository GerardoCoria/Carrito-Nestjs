import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCustomerDto, UpdateCustomerDto } from '../dto/customer.dto';

import { Customer } from '../entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel:Model<Customer>
  ){}

  findAll() {
    return this.customerModel.find().exec();
  }

  async findOne(id: string) {
    const customer = await this.customerModel.findOne({email: id }).exec();
    if (!customer) {
      throw new NotFoundException(`No se encontró el carrito #${id}.`);
    }
    return customer;
  }

  async create(data: CreateCustomerDto) {
    const searchCustomer = await this.findOne(data.email)
    if(searchCustomer){
      throw new HttpException('Cliente ya registrado', HttpStatus.FORBIDDEN)
    }
    const newCustomer = new this.customerModel(data);
    return newCustomer.save();
  }

  async update(id: string, changes: UpdateCustomerDto) {
    const customer = await this.customerModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!customer) {
      throw new NotFoundException(`No se encontró la  marca #${id}.`);
    }
    return customer;
  }

  remove(id: string) {
    return this.customerModel.findByIdAndDelete(id);
  }
}
