import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDto>,
  ) {}
  async createUser(body: UserDto): Promise<UserDto> {
    await this.userModel(body).save();
    return body;
  }
  async findAll(): Promise<UserDto[]> {
    const result = await this.userModel.find()
    return result;
  }
}
