import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('categories')
  async getCategories() {
    return this.productsService.getCategories();
  }

  @Get()
  async findAll(
    @Query('page') page?: string, 
    @Query('limit') limit?: string,
    @Query('category') categorySlug?: string
  ) {
    return this.productsService.findAll(
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 20,
      categorySlug
    );
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    return this.productsService.findOne(slug);
  }
}
