import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth/auth.service';
import { HousesModule } from './houses/houses.module';
import * as dotenv from 'dotenv';
dotenv.config(); //cargar variables de la configuracion
@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(process.env.DB_URL),
    HousesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}