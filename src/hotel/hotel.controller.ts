import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { HotelDto, HotelUpdateDto } from './dto';
import { HotelService } from './hotel.service';

@Controller('hotel')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Post()
  addHotel(@Body() dto: HotelDto) {
    return this.hotelService.addHotel(dto);
  }

  @Put()
  updateHotel(@Body() dto: HotelUpdateDto) {
    return this.hotelService.updateHotel(dto);
  }

  @Delete(':id')
  deleteHotel(@Param('id') idHotel: string) {
    return this.hotelService.deleteHotel(idHotel);
  }

  @Get()
  getAllHotels(@Query('skip') skip: string, @Query('take') take: string) {
    return this.hotelService.getAllHotels({
      skip: Number(skip),
      take: Number(take),
    });
  }

  @Get('city/:id')
  getHotelByCity(@Param('id') city_id: string) {
    return this.hotelService.getHotelByCity(city_id);
  }
}
