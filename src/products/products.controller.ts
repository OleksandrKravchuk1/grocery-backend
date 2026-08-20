import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  async getProducts() {
    return this.productsService.getAllProducts();
  }

  @Get('categories')
  async getCategories() {
    return this.productsService.getAllCategories();
  }

  @Get(':id')
  async getProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.getProductById(id);
  }
}
