import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { HouseService } from './house.service';
import { House } from '../entities/house.entity';
import { CreateHouseInput } from './inputs/create-house.input';
import { UpdateHouseInput } from './inputs/update-house.input';

@Resolver(() => House)
export class HouseResolver {
  constructor(private readonly houseService: HouseService) {}

  @Query(() => [House])
  async houses(): Promise<House[]> {
    return this.houseService.findAll();
  }

  @Query(() => House)
  async house(@Args('id') id: string): Promise<House> {
    return this.houseService.findById(id);
  }

  @Mutation(() => House)
  async createHouse(@Args('input') input: CreateHouseInput): Promise<House> {
    return this.houseService.create(input);
  }

  @Mutation(() => House)
  async updateHouse(@Args('id') id: string, @Args('input') input: UpdateHouseInput): Promise<House> {
    return this.houseService.update(id, input);
  }

  @Mutation(() => House)
  async deleteHouse(@Args('id') id: string): Promise<House> {
    return this.houseService.delete(id);
  }
}