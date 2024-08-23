import { Controller, Get, Render } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductService } from 'src/models/products.service';

@Controller('/admin')
@ApiTags('/admin')
export class AdminController {
  constructor(private readonly productService: ProductService) {}
  @Get('/')
  @ApiOperation({ summary: 'Views the Admin page' })
  @ApiResponse({ status: 200, description: 'Admin page' })
  @Render('admin/index')
  index() {
    const viewData = [];
    viewData['title'] = 'Admin Page - Admin - Online Store';
    return {
      viewData: viewData,
    };
  }
}
