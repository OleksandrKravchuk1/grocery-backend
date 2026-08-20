import { Module } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { FavouritesController } from './favourites.controller';

@Module({
  providers: [FavouritesService],
  controllers: [FavouritesController]
})
export class FavouritesModule {}
