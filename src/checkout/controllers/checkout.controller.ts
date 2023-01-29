import { Controller, Get,Param, Body, Post, Put, Delete } from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";

import { CreateCheckoutDto, UpdateCheckoutDto } from '../dto/checkout.dto';
import { CheckoutService } from "../services/checkout.service";

@ApiTags('Checkout')
@Controller('checkout')
export class CheckoutController {
  constructor(private checkoutService: CheckoutService) {}

  @Get()
  findAll() {
    return this.checkoutService.findAll();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.checkoutService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateCheckoutDto) {
    return this.checkoutService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateCheckoutDto) {
    return this.checkoutService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkoutService.remove(id);
  }
}
