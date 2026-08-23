import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { DeliveriesModule } from 'src/deliveries/deliveries.module';

@Module({
  imports: [DeliveriesModule],
  providers: [OrdersService],
  controllers: [OrdersController]
})
export class OrdersModule {}
