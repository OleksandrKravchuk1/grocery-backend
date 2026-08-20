import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) { }

  async getAllProducts() {
    return this.prisma.products.findMany({
      orderBy: { created_at: 'desc' }
    })
  }

  async getProductById(id: number) {
    return this.prisma.products.findUnique({
      where: { id },
    });
  }

  async getAllCategories() {
    return this.prisma.categories.findMany();
  }
}
