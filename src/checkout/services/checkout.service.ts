import { Injectable } from '@nestjs/common';

@Injectable()
export class CheckoutService {
  ruta(){
    return {message: 'Ruta del Checkout'}
  }
}
