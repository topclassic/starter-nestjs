import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class UserController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  getHello(): string {
    return this.authService.getHello();
  }
}
