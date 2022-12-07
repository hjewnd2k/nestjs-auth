import { Body, Controller, Post } from '@nestjs/common';
import { CompanyService } from './company.service';
import { companyDto } from './dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  addCompany(@Body() dto: companyDto) {
    return this.companyService.addCompany(dto);
  }
}
