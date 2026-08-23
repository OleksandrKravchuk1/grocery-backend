import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DeliveriesService {
  private readonly logger = new Logger(DeliveriesService.name);
  private activeSimulations = new Map<number, NodeJS.Timeout>();

  constructor(private prisma: PrismaService) { }

  async createDelivery(
    orderId: number,
    restaurantCoord: { lat: number; lng: number },
    userCoord: { lat: number; lng: number },
  ) {
    const delivery = await this.prisma.deliveries.create({
      data: {
        order_id: orderId,
        status: 'pending',
        restaurant_lat: restaurantCoord.lat,
        restaurant_lng: restaurantCoord.lng,
        user_lat: userCoord.lat,
        user_lng: userCoord.lng,
        current_lat: restaurantCoord.lat,
        current_lng: restaurantCoord.lng,
      },
    });

    this.startSimulation(orderId, restaurantCoord, userCoord);
    return delivery;
  }

  private startSimulation(
    orderId: number,
    restaurantCoord: { lat: number; lng: number },
    userCoord: { lat: number; lng: number },
  ) {
    setTimeout(async () => {
      try {
        await this.prisma.deliveries.update({
          where: { order_id: orderId },
          data: { status: 'processing' },
        });
      } catch (error) {
        this.logger.error(`Failed to update status to processing for order ${orderId}`, error);
      }
    }, 10000);

    setTimeout(() => {
      this.runCourierMovement(orderId, restaurantCoord, userCoord);
    }, 25000);
  }

  private runCourierMovement(
    orderId: number,
    restaurantCoord: { lat: number; lng: number },
    userCoord: { lat: number; lng: number },
  ) {
    const totalSteps = 20;
    let currentStep = 0;

    const timer = setInterval(async () => {
      try {
        currentStep++;
        const progress = currentStep / totalSteps;

        const currentLat =
          Number(restaurantCoord.lat) +
          (Number(userCoord.lat) - Number(restaurantCoord.lat)) * progress;
        const currentLng =
          Number(restaurantCoord.lng) +
          (Number(userCoord.lng) - Number(restaurantCoord.lng)) * progress;

        if (currentStep >= totalSteps) {
          clearInterval(timer);
          this.activeSimulations.delete(orderId);

          await this.prisma.deliveries.update({
            where: { order_id: orderId },
            data: {
              status: 'delivered',
              current_lat: userCoord.lat,
              current_lng: userCoord.lng,
            },
          });
        } else {
          await this.prisma.deliveries.update({
            where: { order_id: orderId },
            data: {
              status: 'shipped',
              current_lat: currentLat,
              current_lng: currentLng,
            },
          });
        }
      } catch (error) {
        this.logger.error(`Error during courier movement simulation for order ${orderId}`, error);
        clearInterval(timer);
        this.activeSimulations.delete(orderId);
      }
    }, 3000);

    this.activeSimulations.set(orderId, timer);
  }

  async getDeliveryStatus(orderId: number) {
    return this.prisma.deliveries.findUnique({
      where: { order_id: orderId },
    });
  }
}
