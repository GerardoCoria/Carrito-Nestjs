import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return {message: 'Carrito de compras realizado en NestJs'};
  }
}
