import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) { }

  async getUserOrders(userId: string) {
    return this.prisma.orders.findMany({
      where: { user_id: userId },
      include: {
        order_items: {
          include: { products: true }
        },
      },
      orderBy: { created_at: 'desc' }
    });
  }

  async createOrder(userId: string, data: any) {
    return this.prisma.orders.create({
      data: {
        user_id: userId,
        total_price: data.totalPrice,
        status: 'pending',
        order_items: {
          create: data.items.map((item: any) => ({
            product_id: item.productId,
            quantity: item.quantity,
            price_at_time: item.price,
          })),
        },
      },
    });
  }
}
