import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './service';
import { UserDto } from './dto';
import { UserInput } from './input';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserDto])
  async Users() {
    return this.userService.findAll();
  }

  @Mutation(() => UserDto)
  async createUser(@Args('input') input: UserInput) {
    return this.userService.createUser(input);
  }
}
