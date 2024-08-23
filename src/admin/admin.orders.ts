import { Controller, Get, Render } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderService } from 'src/models/orders.service';

@Controller('/admin/orders')
@ApiTags('/admin/orders')
export class AdminOrdersController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @ApiOperation({ summary: 'Views the Admin Orders page' })
  @ApiResponse({ status: 200, description: 'Admin Orders page' })
  @Render('admin/orders/index')
  async index() {
    const viewData = [];
    viewData['title'] = 'Admin Page - Orders - Online Store';
    viewData['orders'] = await this.orderService.findAll();
    return {
      viewData: viewData,
    };
  }
}
