import { Controller, Get, Render } from '@nestjs/common';

@Controller('/')
export class AppController {
  @Get('/')
  @Render('index')
  index() {
    return {
      title: 'Home Page',
    };
  }
  @Get('/about')
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
