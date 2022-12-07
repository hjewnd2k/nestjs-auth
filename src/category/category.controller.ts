import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  addCategory(@Body() category: CategoryDto) {
    return this.categoryService.addCategory(category);
  }

  @Get()
  getAllCategory() {
    return this.categoryService.getAllCategory();
  }
}
