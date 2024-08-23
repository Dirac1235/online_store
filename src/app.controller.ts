import { Controller, Get, Render } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductService } from './models/products.service';

@Controller('/')
@ApiTags('/')
export class AppController {
  constructor(private readonly productService: ProductService) {}
  @Get('/')
  @ApiOperation({ summary: 'Views Home Page' })
  @ApiResponse({ status: 200, description: 'Home Page' })
  @Render('index')
  async index() {
    const viewData = [];
    viewData['title'] = 'Homepage - Online Store';
    viewData['products'] = (await this.productService.findAll()).slice(0, 3);
    return {
      viewData: viewData,
    };
  }
  @Get('/about')
  @ApiOperation({ summary: 'Views About Page' })
  @ApiResponse({ status: 200, description: 'Views the About Page' })
  @Render('about')
  about() {
    const viewData = [];
    viewData['description'] = 'This is an about page ...';
    viewData['author'] = 'Developed by: Webi Muleta';
    viewData['title'] = 'About us - Online Store';
    return {
      viewData: viewData,
    };
  }
}
