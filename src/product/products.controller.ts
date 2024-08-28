import { Controller, Get, Param, Res } from '@nestjs/common';
import { ProductService } from '../models/products.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('/products')
@ApiTags('/products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}
  @Get('/')
  @ApiOperation({ summary: 'Views the products page' })
  @ApiResponse({ status: 200, description: 'Products page' })
  async index(@Res() response) {
    const viewData = [];
    viewData['title'] = 'Products - Online Store';
    viewData['subtitle'] = 'List of products';
    viewData['products'] = await this.productService.findAll();
    return response.render('products/index', { viewData: viewData });
  }
  @Get('/:id')
  @ApiOperation({ summary: 'Views the product detail page' })
  @ApiResponse({ status: 200, description: 'Product detail page' })
  async show(@Param('id') id: string, @Res() response) {
    const product = await this.productService.findOne(id);
    if (product == undefined) {
      return response.redirect('/product');
    }
    const viewData = [];
    viewData['title'] = product.name + ' - Online Store';
    viewData['subtitle'] = product.name + ' - Product Information';
    viewData['product'] = product;
    return response.render('products/show', { viewData: viewData });
  }
}
