import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import Stripe from 'stripe';

@Injectable()
export class OrdersService {
  private stripe: any; // using any to bypass strict Stripe typings issues
  private readonly isMocked = !process.env.STRIPE_SECRET_KEY;

  constructor(private prisma: PrismaService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mocked', {
      apiVersion: '2025-02-24.acacia' as any,
    });
  }

  async checkout(userId: string) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: { include: { product: true } }
      }
    });

    if (!cart || cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    let totalAmount = 0;
    const orderItems = cart.items.map(item => {
      const lineTotal = Number(item.product.price) * item.quantity;
      totalAmount += lineTotal;
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: item.product.price,
      };
    });

    const order = await this.prisma.order.create({
      data: {
        customerId: userId,
        totalAmount,
        status: 'PENDING',
        items: {
          create: orderItems
        }
      }
    });

    if (this.isMocked) {
      // Return a mocked URL that hits our webhook helper to simulate fulfillment
      return { 
        url: `http://localhost:3001/webhooks/mock-success?session_id=mock_session_${order.id}`,
        mocked: true 
      };
    }

    const lineItems = cart.items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.product.name,
        },
        unit_amount: Math.round(Number(item.product.price) * 100), // cents
      },
      quantity: item.quantity,
    }));

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `http://localhost:3000/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/checkout/cancel`,
      client_reference_id: order.id,
      metadata: {
        orderId: order.id,
        userId,
      }
    });

    return { url: session.url };
  }

  async getMyOrders(userId: string) {
    return this.prisma.order.findMany({
      where: { customerId: userId },
      include: {
        items: { include: { product: true } },
        payment: true,
        delivery: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }
}
