import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { SellerService } from './seller.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('seller')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SELLER', 'ADMIN') // Admins can also view seller endpoints
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Get('stats')
  async getStats(@Req() req: any) {
    return this.sellerService.getDashboardStats(req.user.id);
  }

  @Get('products')
  async getProducts(@Req() req: any) {
    return this.sellerService.getProducts(req.user.id);
  }

  @Get('orders')
  async getOrders(@Req() req: any) {
    return this.sellerService.getOrders(req.user.id);
  }
}
