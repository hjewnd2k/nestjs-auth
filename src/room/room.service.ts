import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IRoomDto, RoomDto, RoomTypeDto } from './dto';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}

  async addRoomType(dto: RoomTypeDto) {
    const { type_name } = dto;
    const roomType = await this.prisma.roomType.create({
      data: { type_name },
    });
    if (!roomType) {
      throw new BadRequestException('Có lỗi xảy ra');
    }
    return { roomType };
  }

  async addRoom(dto: RoomDto) {
    const room = await this.prisma.room.create({
      data: { ...dto, description: JSON.stringify(dto.description) },
    });

    if (!room) {
      throw new BadRequestException('Có lỗi xảy ra');
    }

    console.log(typeof room.description);

    room.description = JSON.parse(room.description as string);

    return { room };
  }

  async updateRoom(dto: IRoomDto) {
    const { id, ...data } = dto;
    if (dto.description) {
      const room = await this.prisma.room.update({
        where: { id: id },
        data: { ...data, description: JSON.stringify(dto.description) },
      });
      if (!room) {
        throw new BadRequestException('Có lỗi xảy ra');
      }
      return { room };
    } else {
      const { description, ...newData } = data;
      const room = await this.prisma.room.update({
        where: { id: id },
        data: { ...newData },
      });
      if (!room) {
        throw new BadRequestException('Có lỗi xảy ra');
      }
      return { room };
    }
  }
}
