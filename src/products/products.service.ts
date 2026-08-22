import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) { }

  async getAllProducts(params?: { skip?: number; take?: number; categoryId?: number; search?: string }) {
    const { skip = 0, take = 20, categoryId, search } = params || {};

    return this.prisma.products.findMany({
      skip,
      take,
      where: {
        ...(categoryId && { category_id: categoryId }),
        ...(search && {
          title: {
            contains: search,
            mode: 'insensitive',
          },
        }),
      },
      orderBy: { created_at: 'desc' },
      include: { media: true },
    });
  }

  async getProductById(id: number) {
    const product = await this.prisma.products.findUnique({
      where: { id },
      include: { media: true },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async getAllCategories() {
    return this.prisma.categories.findMany();
  }
}
