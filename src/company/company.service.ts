import { companyDto } from './dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async addCompany(dto: companyDto) {
    console.log({ dto });

    const company = await this.prisma.company.create({
      data: { ...dto },
    });

    if (!company) {
      throw new BadRequestException('Có lỗi xảy ra');
    }

    return { company };
  }
}
