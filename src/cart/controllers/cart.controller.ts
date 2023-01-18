import { Controller, Get } from '@nestjs/common';
import { CartService } from "../services/cart.service";

@Controller('cart')
export class CartController {
  constructor(private services:CartService){}

  @Get()
  ruta(){
    return this.services.ruta()
  }
}
