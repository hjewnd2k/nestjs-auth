import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HotelDto, HotelUpdateDto } from './dto';

@Injectable()
export class HotelService {
  constructor(private prisma: PrismaService) {}

  async addHotel(dto: HotelDto) {
    const hotel = await this.prisma.hotel.create({
      data: { ...dto },
    });

    if (!hotel) {
      throw new BadRequestException('Có lỗi xảy ra');
    }

    return { hotel };
  }

  async updateHotel(dto: HotelUpdateDto) {
    const { id, ...data } = dto;

    const hotel = await this.prisma.hotel.update({
      where: { id },
      data: data,
    });

    return { hotel };
  }

  async deleteHotel(id: string) {
    const deleteHotel = await this.prisma.hotel.delete({
      where: { id },
    });

    if (!deleteHotel) {
      throw new BadRequestException('Có lỗi xảy ra');
    }

    return { message: 'Xoá khách sạn thành công' };
  }

  async getAllHotels(params: { skip?: number; take?: number }) {
    const { skip, take } = params;
    console.log(params);

    const hotels = await this.prisma.hotel.findMany({
      skip,
      take,
    });

    return { hotels };
  }

  async getHotelByCity(city_id: string) {
    const hotels = await this.prisma.hotel.findMany({
      where: { city_id },
      include: { room: true },
    });

    const newHotels = hotels.map((hotel) => {
      let max_price = hotel.room?.[0]?.current_price ?? 0;
      let min_price = hotel.room?.[0]?.current_price ?? 0;
      hotel.room.forEach((item) => {
        if (item.current_price > max_price) {
          max_price = item.current_price;
        }
        if (item.current_price < min_price) {
          min_price = item.current_price;
        }
      });
      return {
        ...hotel,
        min_price,
        max_price,
      };
    });

    if (!hotels) {
      throw new BadRequestException('Có lỗi xảy ra');
    }

    return { hotels: newHotels, count: hotels.length };
  }
}
