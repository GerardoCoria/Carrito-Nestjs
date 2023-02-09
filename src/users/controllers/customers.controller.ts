import { Controller, Get,Param, Post, Put, Delete, Body, UseGuards } from '@nestjs/common';

import { ApiKeyGuard } from "../../auth/guards/api-key.guard";;
import { CreateCustomerDto, UpdateCustomerDto } from '../dto/customer.dto';
import { CustomersService } from '../services/customers.service';

//@UseGuards(ApiKeyGuard)
@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService) {}

  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.customerService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateCustomerDto) {
    return this.customerService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateCustomerDto) {
    return this.customerService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(id);
  }
}
