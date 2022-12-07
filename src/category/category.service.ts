import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async addCategory(category: CategoryDto) {
    const { category_name } = category;

    const newCategory = await this.prisma.category.create({
      data: { category_name },
    });

    if (!newCategory) {
      throw new BadRequestException('Có lỗi xảy ra');
    }

    return { category: newCategory };
  }

  async getAllCategory() {
    const categories = await this.prisma.category.findMany();

    return { categories };
  }
}
