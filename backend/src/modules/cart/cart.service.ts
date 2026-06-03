import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { AddCartItemDto } from './dto/add-cart-item.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getCart(userId: string) {
    let cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: { include: { images: true } }
          }
        }
      }
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { userId },
        include: { items: { include: { product: { include: { images: true } } } } }
      });
    }

    return cart;
  }

  async addItem(userId: string, dto: AddCartItemDto) {
    let cart = await this.prisma.cart.findUnique({ where: { userId } });
    
    if (!cart) {
      cart = await this.prisma.cart.create({ data: { userId } });
    }

    const product = await this.prisma.product.findUnique({ where: { id: dto.productId } });
    if (!product || product.deletedAt) throw new NotFoundException('Product not found');

    const existingItem = await this.prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: dto.productId
        }
      }
    });

    if (existingItem) {
      await this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + dto.quantity }
      });
    } else {
      await this.prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: dto.productId,
          quantity: dto.quantity
        }
      });
    }

    return this.getCart(userId);
  }

  async removeItem(userId: string, itemId: string) {
    const cart = await this.prisma.cart.findUnique({ where: { userId } });
    if (!cart) throw new NotFoundException('Cart not found');

    const item = await this.prisma.cartItem.findUnique({ where: { id: itemId } });
    if (item && item.cartId === cart.id) {
      await this.prisma.cartItem.delete({ where: { id: itemId } });
    }

    return this.getCart(userId);
  }
}
