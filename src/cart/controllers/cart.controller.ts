import { Controller, Get } from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";

import { CartService } from "../services/cart.service";

@ApiTags('Carrito')
@Controller('cart')
export class CartController {
  constructor(private services:CartService){}

  @Get()
  ruta(){
    return this.services.ruta()
  }
}
