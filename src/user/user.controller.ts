import { Controller, Post, Res, HttpStatus, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserInput } from './input/user.input';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async getHello(@Res() res: any, @Body() user: UserInput) {
    const resp = await this.userService.createUser(user);
    res.type('application/json').code(HttpStatus.OK);
    return res.send(resp);
  }
}
