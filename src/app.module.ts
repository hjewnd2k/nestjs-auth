import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { CityModule } from './city/city.module';
import { FileModule } from './file/file.module';
import { CategoryModule } from './category/category.module';
import { HotelModule } from './hotel/hotel.module';
import { CompanyModule } from './company/company.module';
import { RoomModule } from './room/room.module';

@Module({
  imports: [AuthModule, PrismaModule, UsersModule, CityModule, FileModule, CategoryModule, HotelModule, CompanyModule, RoomModule],
})
export class AppModule {}
