import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HouseResolver } from './house.resolver';
import { HouseService } from './house.service';
import { House, HouseSchema } from '../entities/house.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: House.name, schema: HouseSchema }])],
  providers: [HouseResolver, HouseService],
})
export class HouseModule {}