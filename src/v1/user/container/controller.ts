import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Query,
  Req,
} from '@nestjs/common';
import { UserService } from './service';
import { CreateUserDto, UpdateUserDto, ParamDTO } from './dto';

@Controller('v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Req() @Body() body: CreateUserDto) {
    const resp = await this.userService.create({
      ...body,
    });
    return resp;
  }

  @Patch('id/:id')
  async update(@Param() param: ParamDTO, @Body() body: UpdateUserDto) {
    const resp = await this.userService.update({ ...param }, body);
    return resp;
  }

  @Get()
  async find(@Query() query: any) {
    const resp = await this.userService.find(query);
    return resp;
  }

  @Get('id/:id')
  async findOne(@Param() param: ParamDTO, @Query() query: Object) {
    const resp = await this.userService.findOne(param, query);
    return resp;
  }
}
