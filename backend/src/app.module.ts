import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './common/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { AdminModule } from './modules/admin/admin.module';
import { PostsModule } from './modules/posts/posts.module';
import { ProductsModule } from './modules/products/products.module';
import { CartModule } from './modules/cart/cart.module';
import { OrdersModule } from './modules/orders/orders.module';
import { WebhooksModule } from './modules/webhooks/webhooks.module';
import { SellerModule } from './modules/seller/seller.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, ProfilesModule, AdminModule, PostsModule, ProductsModule, CartModule, OrdersModule, WebhooksModule, SellerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
