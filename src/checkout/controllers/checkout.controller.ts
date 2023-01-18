import { Controller, Get } from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";

import { CheckoutService } from "../services/checkout.service";

@ApiTags('Checkout')
@Controller('checkout')
export class CheckoutController {
  constructor(private services:CheckoutService){}

  @Get()
  ruta(){
    return this.services.ruta()
  }
}
