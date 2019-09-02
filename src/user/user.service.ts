import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserInput } from './input/user.input';
import { of, Observable } from 'rxjs';

@Injectable()
export class UserService {
  constructor(@Inject('User') private readonly userModel: Model<UserDto>) {}
  createUser(body: UserInput): Observable<UserInput> {
    this.userModel(body).save();
    return of(body);
  }
  async findAll(): Promise<UserDto[]> {
    const result = await this.userModel.find();
    return result;
  }
}
