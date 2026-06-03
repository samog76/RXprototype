import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(page = 1, limit = 20, categorySlug?: string) {
    const skip = (page - 1) * limit;
    
    const whereClause: any = { deletedAt: null };
    if (categorySlug) {
      whereClause.category = { slug: categorySlug };
    }

    const products = await this.prisma.product.findMany({
      where: whereClause,
      include: {
        images: true,
        category: true,
        seller: { include: { profile: true } }
      },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' }
    });

    const total = await this.prisma.product.count({ where: whereClause });

    return {
      products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }

  async findOne(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        images: true,
        category: true,
        seller: { include: { profile: true } },
        reviews: {
          include: { user: { include: { profile: true } } }
        }
      }
    });

    if (!product || product.deletedAt) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async getCategories() {
    return this.prisma.category.findMany();
  }
}
