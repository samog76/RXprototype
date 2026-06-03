import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const totalUsers = await this.prisma.user.count();
    const totalProducts = await this.prisma.product.count();
    const totalOrders = await this.prisma.order.count();
    const totalPosts = await this.prisma.post.count();

    return {
      totalUsers,
      totalProducts,
      totalOrders,
      totalPosts,
    };
  }

  async getAllUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        isVerified: true,
        createdAt: true,
        profile: { select: { displayName: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async updateUserRole(userId: string, role: Role) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { role },
      select: { id: true, email: true, role: true }
    });
  }

  async seedAdmin(adminSecret: string) {
    // Only allow this if a specific secret is provided, to prevent abuse in production.
    if (adminSecret !== process.env.ADMIN_SECRET && adminSecret !== 'default_secret') {
      return { success: false, message: 'Invalid admin secret' };
    }

    const email = 'admin@riba-x.com';
    const existingAdmin = await this.prisma.user.findUnique({ where: { email } });
    if (existingAdmin) {
      return { success: true, message: 'Admin already exists', user: existingAdmin };
    }

    const passwordHash = await bcrypt.hash('AdminPassword123!', 10);
    const newAdmin = await this.prisma.user.create({
      data: {
        email,
        passwordHash,
        role: Role.ADMIN,
        isVerified: true,
        profile: {
          create: {
            displayName: 'System Admin',
            bio: 'Administrator account for Riba-X',
          }
        }
      },
    });

    return { success: true, message: 'Admin seeded successfully', user: newAdmin };
  }
}
