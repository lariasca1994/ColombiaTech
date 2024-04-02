import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';
import { CreateUserInput, UpdateUserInput } from './inputs/user.inputs'; // Assuming UpdateUserInput is defined
import { AuthService } from '../services/auth.service'; // Assuming AuthService for authentication

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService // Inject AuthService
  ) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    // Consider authorization checks here if needed
    return this.userService.findAll();
  }

  @Query(() => User, { nullable: true })
  async user(@Args('id') id: number): Promise<User | null> {
    // Consider authorization checks here if needed
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput) {
    // Implement authentication for createUser if needed
    return this.userService.create(input);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: number,
    @Args('input') input: UpdateUserInput
  ) {
    // Implement authorization checks to ensure user is allowed to update
    // e.g., check if current user is the same as the one being updated or has admin permissions
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }

    // Apply updates to the user entity
    // ...

    return this.userService.update(user);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: number) {
    // Implement authorization checks to ensure deletion permission
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }

    await this.userService.delete(id);
    return true;
  }
}