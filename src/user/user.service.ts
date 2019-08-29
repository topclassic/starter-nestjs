import { Injectable } from '@nestjs/common';
import { User } from './user.interface';
// import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
  async getHello(body: User): Promise<User> {
    console.log('body', body);
    return body;
  }
}
