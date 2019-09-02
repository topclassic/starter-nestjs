import { Controller, Post, Res, HttpStatus, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  getHello(@Res() res: any, @Body() user) {
    return this.authService.login(user).subscribe(resp => {
      res.type('application/json').code(HttpStatus.OK);
      return res.send(resp);
    });
  }
}
