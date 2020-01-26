import { Injectable, Inject } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { findOption, findOneOption, updateOption } from '@utils/repository';
import { alreadyExistsException } from '@utils/validation';
import { CreateUserDto, UpdateUserDto, ParamDTO } from './dto';
import { User } from '../user.entity';

const modelInclude = {};

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private readonly user: typeof User,
    @Inject('SEQUELIZE') protected readonly sequelize: Sequelize,
  ) {}

  async create(body: CreateUserDto): Promise<User> {
    const { phone } = body;
    await alreadyExistsException(this.user, { phone }, '');
    return await this.user.create<User>(body);
  }

  async update(where: any, body: UpdateUserDto) {
    const subQueryUpdate = [];
    const subQueryCreate = [];
    const result = updateOption(this, 'user', {
      where,
      body,
      subQueryUpdate,
      subQueryCreate,
    });
    return result;
  }

  async find(query: any): Promise<User[]> {
    const option: any = findOption(modelInclude, query);
    return this.user.findAll<User>(option);
  }

  async findOne(param: ParamDTO, query: any): Promise<User> {
    const option: any = findOneOption(modelInclude, { param, ...query });
    return this.user.findOne<User>(option);
  }
}
