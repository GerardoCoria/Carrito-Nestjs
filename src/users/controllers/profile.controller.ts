import { Controller, UseGuards, Get, Req } from '@nestjs/common';
import { Request } from "express";
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from "../../auth/decorators/roles.decorator";
import { Role } from "../../auth/models/roles.model";
import { PayloadToken } from '../../auth/models/token.model';
import { OrdersService } from "../../orders/services/orders.service";

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags("Perfil")
@Controller('profile')
export class ProfileController {
  constructor(private orderService:OrdersService){}

  @Roles(Role.CUSTOMER)
  @Get('my-orders')
  getOrders(@Req() req:Request) {
    const user = req.user as PayloadToken;
    return this.orderService.ordersByCustomer(user.sub);
  }
}
