import { Controller, Get, Render, Req } from '@nestjs/common';
import { OrderService } from '../models/orders.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@Controller('/account')
@ApiTags('/account')
export class AccountController {
  constructor(private readonly ordersService: OrderService) {}
  @Get('/orders')
  @ApiOperation({ summary: 'Views the orders page' })
  @ApiResponse({ status: 200, description: 'Orders page' })
  @Render('account/orders')
  async orders(@Req() request) {
    const viewData = [];
    viewData['title'] = 'My Orders - Online Store';
    viewData['subtitle'] = 'My Orders';
    viewData['orders'] = await this.ordersService.findByUserId(
      request.session.user.id,
    );
    return {
      viewData: viewData,
    };
  }
}
