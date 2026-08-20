import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { SupabaseAuthGuard } from '../auth/supabase.guard';

@Controller('orders')
@UseGuards(SupabaseAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Get()
  async getOrders(@Req() req: any) {
    return this.ordersService.getUserOrders(req.user.userId);
  }

  @Post()
  async createOrder(@Req() req: any, @Body() body: any) {
    return this.ordersService.createOrder(req.user.userId, body)
  }
}
