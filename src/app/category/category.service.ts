import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from '../../shared/database/database.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma : PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.prisma.category.create(
      { data: createCategoryDto }
    );
  }

  async findAll(): Promise<Category[]> {
    return await this.prisma.category.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.category.findUnique({ where: {id} });
  }

  async update(id: number,
     updateCategoryDto: UpdateCategoryDto) : Promise<Category> {
    return await this.prisma.category.update({
      data: {...updateCategoryDto},
      where: { id },
    });
  }

  async remove(id: number) {
    return await this.prisma.category.delete({ where: { id }});
  }
}
