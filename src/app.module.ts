import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { FavouritesModule } from './favourites/favourites.module';

@Module({
  imports: [PrismaModule, AuthModule, ProductsModule, OrdersModule, UsersModule, FavouritesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
