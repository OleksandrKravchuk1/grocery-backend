import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { GetProductsQueryDto } from './dto/get-products-query.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get('categories')
  async getCategories() {
    return this.productsService.getAllCategories();
  }

  @Get()
  async getProducts(@Query() query: GetProductsQueryDto) {
    return this.productsService.getAllProducts(query);
  }

  @Get(':id')
  async getProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.getProductById(id);
  }
}