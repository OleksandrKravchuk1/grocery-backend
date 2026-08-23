import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';

@Controller('deliveries')
export class DeliveriesController {
  constructor(private readonly deliveriesService: DeliveriesService) { }

  @Get(':orderId/status')
  async getStatus(@Param('orderId', ParseIntPipe) orderId: number) {
    const delivery = await this.deliveriesService.getDeliveryStatus(orderId);
    if (!delivery) {
      return { status: 'pending' };
    }
    return {
      status: delivery.status,
      location:
        delivery.current_lat && delivery.current_lng
          ? {
              latitude: Number(delivery.current_lat),
              longitude: Number(delivery.current_lng),
            }
          : null,
    };
  }
}
