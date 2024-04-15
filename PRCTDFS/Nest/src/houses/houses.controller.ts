import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { House } from './house.entity';
import { CreateHouseDto } from './dto/create.house.dto';
import { HousesService } from './houses.service';

@Controller('house')
export class HousesController {


  constructor(private readonly HousesService: HousesService) {}



  @Post()
  @HttpCode(201)
  async create(@Body() CreateHouseDto: CreateHouseDto): Promise<House> {
    return this.HousesService.create(CreateHouseDto);
  }

  @Get()
  async findAll(): Promise<House[]> {
    return this.HousesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<House> {
    return this.HousesService.findOne(id);
  }
  
@Put(':id')
async update(
  @Param('id')id: string,
  @Body() updateHouse: CreateHouseDto,):
  Promise<House> {
  return this.HousesService.update(id,updateHouse);
}

@Delete (':id')
async delete(@Param('id')id: string): Promise<boolean> {
    return this.HousesService.delete(id);
  }
}