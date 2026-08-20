import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavouritesService {
  constructor(private prisma: PrismaService) { }

  async getUserFavourites(userId: string) {
    return this.prisma.favourites.findMany({
      where: { user_id: userId },
      include: {
        products: true,
      },
    });
  }

  async addFavourite(userId: string, productId: number) {
    return this.prisma.favourites.create({
      data: {
        user_id: userId,
        product_id: productId,
      },
    });
  }

  async removeFavourite(userId: string, productId: number) {
    return this.prisma.favourites.deleteMany({
      where: {
        user_id: userId,
        product_id: productId,
      },
    });
  }
}
