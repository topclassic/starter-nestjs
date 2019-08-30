import { IsEmail, IsString } from 'class-validator';
import { InputType, Field } from 'type-graphql';

@InputType()
export class UserInput {
  @IsEmail()
  @Field()
  readonly email: string;
  @IsString()
  @Field()
  readonly password: string;
}
