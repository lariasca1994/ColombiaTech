import { Test, TestingModule } from '@nestjs/testing';
import { HouseService } from './house.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { House, HouseDocument } from '../entities/house.entity';

describe('HouseService', () => {
  let service: HouseService;
  let model: Model<HouseDocument>;

  const mockHouse = {
    _id: '1',
    address: 'Calle 123',
    city: 'Ciudad',
    state: 'Estado',
    size: 100,
    type: 'Casa',
    zip_code: '12345',
    code: 'ABC123',
    rooms: 3,
    bathrooms: 2,
    price: 200000,
    image: 'https://example.com/house.jpg',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HouseService,
        {
          provide: getModelToken(House.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockHouse),
            constructor: jest.fn().mockResolvedValue(mockHouse),
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<HouseService>(HouseService);
    model = module.get<Model<HouseDocument>>(getModelToken(House.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of houses', async () => {
      const result = [mockHouse];
      jest.spyOn(model, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(result),
      } as any);
      const houses = await service.findAll();
      expect(houses).toEqual(result);
    });
  });

  describe('findById', () => {
    it('should return a house by id', async () => {
      const result = mockHouse;
      jest.spyOn(model, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(result),
      } as any);
      const house = await service.findById('1');
      expect(house).toEqual(result);
    });
  });

  describe('create', () => {
    it('should create a new house', async () => {
      const createHouseInput = {
        address: mockHouse.address,
        city: mockHouse.city,
        state: mockHouse.state,
        size: mockHouse.size,
        type: mockHouse.type,
        zip_code: mockHouse.zip_code,
        code: mockHouse.code,
        rooms: mockHouse.rooms,
        bathrooms: mockHouse.bathrooms,
        price: mockHouse.price,
        image: mockHouse.image,
      };

      const result = mockHouse;
      jest.spyOn(model, 'create').mockResolvedValueOnce(result);
      const house = await service.create(createHouseInput);
      expect(house).toEqual(result);
    });
  });

  describe('update', () => {
    it('should update an existing house', async () => {
      const updateHouseInput = {
        address: 'Nueva Calle 456',
        city: 'Nueva Ciudad',
        state: 'Nuevo Estado',
        size: 150,
        type: 'Casa Actualizada',
        zip_code: '67890',
        code: 'XYZ789',
        rooms: 4,
        bathrooms: 3,
        price: 300000,
        image: 'https://example.com/new-house.jpg',
      };

      const updatedHouse = {
        ...mockHouse,
        ...updateHouseInput,
      };

      jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(updatedHouse),
      } as any);

      const result = await service.update('1', updateHouseInput);
      expect(result).toEqual(updatedHouse);
    });
  });

  describe('delete', () => {
    it('should delete an existing house', async () => {
      const result = mockHouse;
      jest.spyOn(model, 'findByIdAndDelete').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(result),
      } as any);

      const deletedHouse = await service.delete('1');
      expect(deletedHouse).toEqual(result);
    });
  });
});