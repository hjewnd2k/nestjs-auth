import { PrismaService } from './../prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { cityDto } from './dto';

@Injectable()
export class CityService {
  constructor(private prisma: PrismaService) {}

  async addCity(city: cityDto) {
    const { city_name, thumbnail } = city;

    const foundCity = await this.prisma.city.findUnique({
      where: { city_name },
    });

    if (foundCity) {
      throw new BadRequestException('Tên thành phố đã tồn tại');
    }

    const newCity = await this.prisma.city.create({
      data: { city_name, thumbnail },
    });

    if (!newCity) {
      throw new BadRequestException('Có lỗi xảy ra');
    }

    return { city: newCity };
  }

  async getAllCity() {
    const citys = await this.prisma.city.findMany();

    return { citys };
  }
}
