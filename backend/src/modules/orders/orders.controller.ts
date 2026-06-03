import { Controller, Post, Get, UseGuards, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('checkout')
  async checkout(@Req() req: any) {
    return this.ordersService.checkout(req.user.id);
  }

  @Get('my-orders')
  async getMyOrders(@Req() req: any) {
    return this.ordersService.getMyOrders(req.user.id);
  }
}
