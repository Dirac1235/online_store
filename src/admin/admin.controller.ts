import { Controller, Get, Render } from '@nestjs/common';
import { ProductService } from 'src/models/products.service';

@Controller('/admin')
export class AdminController {
  constructor(private readonly productService: ProductService) {}
  @Get('/')
  @Render('admin/index')
  index() {
    const viewData = [];
    viewData['title'] = 'Admin Page - Admin - Online Store';
    return {
      viewData: viewData,
    };
  }
}
