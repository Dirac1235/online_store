import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Render,
  Req,
  Res,
} from '@nestjs/common';
import { User } from 'src/models/user.entity';
import { UserService } from 'src/models/user.service';
import { UserValidator } from 'src/validators/user.validator';

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
  async store(@Req() request, @Res() response, @Body() body) {
    const toValidate: string[] = ['name', 'email', 'password'];
    const errors: string[] = UserValidator.validate(body, toValidate);
    if (errors.length > 0) {
      request.session.flashErrors = errors;
      return response.redirect('/auth/register');
    } else {
      const newUser = new User();
      newUser.setName(body.name);
      newUser.setEmail(body.email);
      newUser.setPassword(body.password);
      newUser.setRole('client');
      newUser.setBalance(body.balance);
      await this.userService.createOrUpdate(newUser);
    }
  }
  @Get('/login')
  @Render('auth/login')
  login() {
    const viewData = [];
    viewData['title'] = 'User Login - Online Store';
    viewData['subtitle'] = 'User Login';
    return {
      viewData: viewData,
    };
  }

  @Post('/connect')
  async connect(@Body() body, @Req() request, @Res() respose) {
    const email = body.email;
    const passWord = body.password;
    const user = await this.userService.login(email, passWord);
    if (user) {
      request.session.user = {
        id: user.getId(),
        name: user.getName(),
        role: user.getRole(),
      };
      return respose.redirect('/');
    } else {
      return respose.redirect('/auth/login');
    }
  }
  @Get('/logout')
  @Redirect('/')
  logout(@Req() request) {
    request.session.user = null;
  }
}
