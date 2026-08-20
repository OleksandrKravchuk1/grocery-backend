import { Controller, Get, Post, Delete, Param, Req, UseGuards, ParseIntPipe } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { SupabaseAuthGuard } from '../auth/supabase.guard';

@Controller('favourites')
@UseGuards(SupabaseAuthGuard)
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) { }

  @Get()
  async getFavourites(@Req() req: any) {
    return this.favouritesService.getUserFavourites(req.user.userId);
  }

  @Post(':productId')
  async addFavourite(@Req() req: any, @Param('productId', ParseIntPipe) productId: number) {
    return this.favouritesService.addFavourite(req.user.userId, productId);
  }

  @Delete(':productId')
  async removeFavourite(@Req() req: any, @Param('productId', ParseIntPipe) productId: number) {
    return this.favouritesService.removeFavourite(req.user.userId, productId);
  }
}
