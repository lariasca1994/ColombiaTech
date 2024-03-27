import { ObjectType, Field, ID } from 'type-graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
@ObjectType()
export class House {
  @Field(() => ID)
  _id: string;

  @Prop()
  @Field()
  address: string;

  @Prop()
  @Field()
  city: string;

  @Prop()
  @Field()
  state: string;

  @Prop()
  @Field()
  size: number;

  @Prop()
  @Field()
  type: string;

  @Prop()
  @Field()
  zip_code: string;

  @Prop()
  @Field()
  code: string;

  @Prop()
  @Field()
  rooms: number;

  @Prop()
  @Field()
  bathrooms: number;

  @Prop()
  @Field()
  price: number;

  @Prop()
  @Field()
  image: string;
}

export type HouseDocument = House & Document;
export const HouseSchema = SchemaFactory.createForClass(House);