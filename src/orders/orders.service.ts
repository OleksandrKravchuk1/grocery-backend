import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { DeliveriesService } from 'src/deliveries/deliveries.service';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private deliveriesService: DeliveriesService,
  ) { }

  async getUserOrders(userId: string) {
    return this.prisma.orders.findMany({
      where: { user_id: userId },
      include: {
        order_items: {
          include: {
            products: {
              include: { media: true }
            }
          }
        },
      },
      orderBy: { created_at: 'desc' }
    });
  }

  async createOrder(userId: string, data: CreateOrderDto) {
    const order = await this.prisma.orders.create({
      data: {
        user_id: userId,
        total_price: data.totalPrice,
        status: 'pending',
        order_items: {
          create: data.items.map((item: any) => ({
            product_id: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });
    await this.deliveriesService.createDelivery(
      order.id,
      { lat: 50.4501, lng: 30.5234 },
      { lat: 50.4550, lng: 30.5300 }
    );
    return order;
  }
}

