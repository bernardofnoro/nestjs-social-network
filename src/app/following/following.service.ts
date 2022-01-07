import { Injectable } from '@nestjs/common';
import { CreateFollowingDto } from './dto/create-following.dto';
import { UpdateFollowingDto } from './dto/update-following.dto';
import { Following } from '@prisma/client';
import { PrismaService } from 'src/shared/database/database.service';

@Injectable()
export class FollowingService {
  constructor(private prisma: PrismaService) {}


  async create(createFollowingDto: CreateFollowingDto): Promise<Following> {
    return await this.prisma.following.create({
      data: {...createFollowingDto},
    });
  }

  async findAll() : Promise<Following[]> {
    return await this.prisma.following.findMany();
  }

  async findOne(id: number): Promise<Following> {
    return await this.prisma.following.findUnique({ where: { id }});
  };

  async update(id: number,
     updateFollowingDto: UpdateFollowingDto): Promise<Following> {
    return await this.prisma.following.update({
      data: {...updateFollowingDto},
      where: { id },
    });
  }

  async remove(id: number) {
    return await this.prisma.following.delete({where: { id }});
  }
}
