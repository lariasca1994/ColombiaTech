import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { House } from './house.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHouseDto } from './dto/create.house.dto';

@Injectable()
export class HousesService {
  constructor(@InjectModel('House') private readonly houseModel: Model<House>) {}

  async create(CreateHouseDto: CreateHouseDto): Promise<House> {
      const newHouse = new this.houseModel(CreateHouseDto);
      return newHouse.save();
    }

    async findAll(): Promise<House[]> {
      return this.houseModel.find();
    }


    async findOne(id: string): Promise<House> {
      try {
        return await this.houseModel.findById(id);
      } catch (error) {
        throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
      }
    }

    async update(id: string, huseDto: CreateHouseDto): Promise<House> {
    
        return await this.houseModel.findByIdAndUpdate(id, huseDto, { new: true })
      } catch (error) {
        throw new NotFoundException('user Not found');
      }

      async delete(id: string): Promise<boolean> {
          try {
            const House = await this.houseModel.findByIdAndDelete(id);
            if (!House) {
              throw new NotFoundException('house Not found');
            }
            return true;
          } catch (err) {
            throw new NotFoundException('house Not found');
          }
        }
}