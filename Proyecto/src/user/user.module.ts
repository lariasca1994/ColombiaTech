import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserResolver } from '../resolvers/user.resolver';
import { UserService } from '../services/user.service';
import { User, UserSchema } from '../entities/user.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UserResolver, UserService],
})
export class UserModule {}