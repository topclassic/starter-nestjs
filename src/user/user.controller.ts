import { Controller, Post, Res, HttpStatus, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async getHello(@Res() res: any, @Body() user: User) {
    const resp = await this.userService.getHello(user);
    res.type('application/json').code(HttpStatus.OK);
    return res.send(resp);
  }
}
