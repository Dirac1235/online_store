import { Controller, Get, Render } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('/')
@ApiTags('/')
export class AppController {
  @Get('/')
  @ApiOperation({ summary: 'Views Home Page' })
  @ApiResponse({ status: 200, description: 'Home Page' })
  @Render('index')
  index() {
    return {
      title: 'Home Page',
    };
  }
  @Get('/about')
  @ApiOperation({ summary: 'Views About Page' })
  @ApiResponse({ status: 200, description: 'Views the About Page' })
  @Render('about')
  about() {
    const viewData = [];
    viewData['description'] = 'This is an about page ...';
    viewData['author'] = 'Developed by: Your Name';
    viewData['title'] = 'About us - Online Store';
    return {
      viewData: viewData,
    };
  }
}
