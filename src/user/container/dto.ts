import { IsEmail, IsString } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Document } from 'mongoose';

export interface User extends Document {
  email?: String;
  password?: String;
  firstname?: String;
  lastname?: String;
}
@ObjectType()
export class UserDto implements User {
  @IsEmail()
  @Field()
  email: String;

  @IsString()
  @Field()
  password: String;

  @IsString()
  firstname: String;
  @IsString()
  lastname: String;
}
