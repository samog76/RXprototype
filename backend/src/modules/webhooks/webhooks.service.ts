import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import Stripe from 'stripe';

@Injectable()
export class WebhooksService {
  private stripe: any;
  private endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  constructor(private prisma: PrismaService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mocked', {
      apiVersion: '2025-02-24.acacia' as any,
    });
  }

  async handleStripeWebhook(signature: string, payload: Buffer) {
    let event: any;

    // For Mocked Flow, we can just parse the JSON directly if there's no secret
    if (!process.env.STRIPE_SECRET_KEY) {
      event = JSON.parse(payload.toString());
    } else {
      try {
        event = this.stripe.webhooks.constructEvent(payload, signature, this.endpointSecret!);
      } catch (err: any) {
        throw new BadRequestException(`Webhook Error: ${err.message}`);
      }
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      await this.fulfillOrder(session);
    }

    return { received: true };
  }

  async fulfillOrder(session: any) {
    const orderId = session.metadata?.orderId || session.client_reference_id;
    const userId = session.metadata?.userId;

    if (!orderId) return;

    // 1. Update Order Status
    await this.prisma.order.update({
      where: { id: orderId },
      data: { status: 'PAID' }
    });

    // 2. Create Payment Record
    await this.prisma.payment.create({
      data: {
        orderId,
        reference: session.id || `mock_pi_${Date.now()}`,
        amount: session.amount_total ? session.amount_total / 100 : 0, // Mock might not have this easily mapped
        status: 'succeeded',
        paymentMethod: 'card'
      }
    });

    // 3. Clear the user's cart
    if (userId) {
      const cart = await this.prisma.cart.findUnique({ where: { userId } });
      if (cart) {
        await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
      }
    }
  }

  // A helper endpoint for the Mock flow to trigger the webhook logic manually
  async mockSuccessWebhook(orderId: string) {
    const order = await this.prisma.order.findUnique({ where: { id: orderId } });
    if (!order) return;

    await this.fulfillOrder({
      metadata: { orderId: order.id, userId: order.customerId },
      id: `mock_session_${order.id}`,
      amount_total: Number(order.totalAmount) * 100
    });
  }
}
