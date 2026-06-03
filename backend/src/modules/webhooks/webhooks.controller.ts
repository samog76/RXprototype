import { Controller, Post, Get, Headers, Req, Query, Res } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import type { Response } from 'express';

@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  @Post('stripe')
  async handleStripe(@Headers('stripe-signature') signature: string, @Req() req: any) {
    // In a real app, this route must be configured to NOT parse JSON (raw body required)
    // For this prototype, we're using the mocked flow mostly.
    return this.webhooksService.handleStripeWebhook(signature, req.body);
  }

  // Helper for the Mock flow to simulate a successful payment easily
  @Get('mock-success')
  async mockSuccess(@Query('session_id') sessionId: string, @Res() res: Response) {
    if (sessionId && sessionId.startsWith('mock_session_')) {
      const orderId = sessionId.replace('mock_session_', '');
      await this.webhooksService.mockSuccessWebhook(orderId);
    }
    
    // Redirect to the real frontend success page
    return res.redirect(`http://localhost:3000/checkout/success`);
  }
}
