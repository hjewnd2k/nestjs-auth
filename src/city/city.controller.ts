import { Body, Controller, Get, Post } from '@nestjs/common';
import { CityService } from './city.service';
import { cityDto } from './dto';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  addCity(@Body() city: cityDto) {
    return this.cityService.addCity(city);
  }

  @Get()
  getAllCity() {
    return this.cityService.getAllCity();
  }
}
