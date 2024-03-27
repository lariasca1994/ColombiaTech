import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { House, HouseDocument } from '../entities/house.entity';
import { CreateHouseInput } from './inputs/create-house.input';
import { UpdateHouseInput } from './inputs/update-house.input';

@Injectable()
export class HouseService {
  constructor(@InjectModel(House.name) private houseModel: Model<HouseDocument>) {}

  async findAll(): Promise<House[]> {
    return this.houseModel.find().exec();
  }

  async findById(id: string): Promise<House> {
    return this.houseModel.findById(id).exec();
  }

  async create(createHouseInput: CreateHouseInput): Promise<House> {
    const createdHouse = new this.houseModel(createHouseInput);
    return createdHouse.save();
  }

  async update(id: string, updateHouseInput: UpdateHouseInput): Promise<House> {
    const updatedHouse = await this.houseModel
      .findByIdAndUpdate(id, updateHouseInput, { new: true })
      .exec();
    return updatedHouse;
  }

  async delete(id: string): Promise<House> {
    const deletedHouse = await this.houseModel.findByIdAndDelete(id).exec();
    return deletedHouse;
  }
}