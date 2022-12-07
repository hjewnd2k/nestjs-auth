import { Body, Controller, Post, Put } from '@nestjs/common';
import { IRoomDto, RoomDto, RoomTypeDto } from './dto';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('room-type')
  addRoomType(@Body() dto: RoomTypeDto) {
    return this.roomService.addRoomType(dto);
  }

  @Post()
  addRoom(@Body() dto: RoomDto) {
    return this.roomService.addRoom(dto);
  }

  @Put()
  updateRoom(@Body() dto: IRoomDto) {
    return this.roomService.updateRoom(dto);
  }
}
