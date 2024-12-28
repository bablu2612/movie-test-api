import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Handle user registration
  @Post('register')
  async register(@Body() userData: { email: string; password: string; username: string }) {
    const user = await this.userService.register(userData);
    return { message: 'User registered successfully', user };
  }

  // Handle user login
  @Post('login')
  async login(@Body() credentials: { email: string; password: string }) {
    const { token } = await this.userService.login(credentials);
    return { message: 'Login successful', token };
  }
}
