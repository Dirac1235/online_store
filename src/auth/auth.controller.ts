import { Body, Controller, Get, Post, Redirect, Render } from '@nestjs/common';
import { User } from 'src/models/user.entity';
import { UserService } from 'src/models/user.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}
  @Get('/register')
  @Render('auth/register')
  register() {
    const viewData = [];
    viewData['title'] = 'User Register - Online Store';
    viewData['subtitle'] = 'User Register';
    return {
      viewData,
    };
  }

  @Post('/store')
  @Redirect('/')
  async store(@Body() body) {
    const newUser = new User();
    newUser.setName(body.name);
    newUser.setEmail(body.email);
    newUser.setPassword(body.password);
    newUser.setRole('client');
    newUser.setBalance(body.balance);
    await this.userService.createOrUpdate(newUser);
  }
}
