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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/models/user.entity';
import { UserService } from 'src/models/user.service';
import { UserValidator } from 'src/validators/user.validator';
import { UserDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('/auth')
@ApiTags('/auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}
  @Get('/register')
  @ApiOperation({ summary: 'Views the Register page' })
  @ApiResponse({ status: 200, description: 'Register page' })
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
  @Redirect('/auth/login')
  @ApiOperation({ summary: 'Registers new user' })
  @ApiResponse({ status: 201, description: 'Registration successful' })
  async store(@Req() request, @Res() response, @Body() body: UserDto) {
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
  @ApiOperation({ summary: 'Views the Login page' })
  @ApiResponse({ status: 200, description: 'Login page' })
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
  @ApiOperation({ summary: 'Login to page' })
  @ApiResponse({ status: 201, description: 'Login Successful' })
  async connect(@Body() body: LoginDto, @Req() request, @Res() respose) {
    const email = body.email;
    const passWord = body.password;
    const user = await this.userService.login(email, passWord);
    if (user) {
      request.session.user = {
        id: user.getId(),
        name: user.getName(),
        role: user.getRole(),
      };
      if (user.getRole() == 'admin') return respose.redirect('/admin');
      return respose.redirect('/');
    } else {
      return respose.redirect('/auth/login');
    }
  }
  @Get('/logout')
  @ApiOperation({ summary: 'Logs out' })
  @ApiResponse({ status: 201, description: 'Logout Successful' })
  @Redirect('/')
  logout(@Req() request) {
    request.session.user = null;
  }
}
