import { Controller, Get } from '@nestjs/common';
import { CheckoutService } from "../services/checkout.service";

@Controller('checkout')
export class CheckoutController {
  constructor(private services:CheckoutService){}

  @Get()
  ruta(){
    return this.services.ruta()
  }
}
