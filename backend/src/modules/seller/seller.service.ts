import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class SellerService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats(sellerId: string) {
    const productsCount = await this.prisma.product.count({
      where: { sellerId }
    });

    const orders = await this.prisma.order.findMany({
      where: { items: { some: { product: { sellerId } } } },
      include: { items: { include: { product: true } } }
    });

    let totalRevenue = 0;
    let totalSales = 0;

    orders.forEach(order => {
      if (order.status === 'PAID' || order.status === 'SHIPPED' || order.status === 'DELIVERED') {
        order.items.forEach(item => {
          if (item.product.sellerId === sellerId) {
            totalRevenue += Number(item.price) * item.quantity;
            totalSales += item.quantity;
          }
        });
      }
    });

    return {
      productsCount,
      totalRevenue,
      totalSales,
      ordersCount: orders.length
    };
  }

  async getProducts(sellerId: string) {
    return this.prisma.product.findMany({
      where: { sellerId, deletedAt: null },
      include: { category: true, images: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getOrders(sellerId: string) {
    return this.prisma.order.findMany({
      where: { items: { some: { product: { sellerId } } } },
      include: {
        customer: { include: { profile: true } },
        items: {
          include: { product: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }
}
