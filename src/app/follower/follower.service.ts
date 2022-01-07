import { Injectable } from '@nestjs/common';
import { CreateFollowerDto } from './dto/create-follower.dto';
import { UpdateFollowerDto } from './dto/update-follower.dto';
import { PrismaService } from 'src/shared/database/database.service';
import { Follower } from '@prisma/client';

@Injectable()
export class FollowerService {
  constructor(private prisma: PrismaService) {}

 async create(createFollowerDto: CreateFollowerDto) : Promise<Follower> {
    return await this.prisma.follower.create({
      data: {...createFollowerDto},
    });
  }

  async findAll() : Promise<Follower[]> {
    return await this.prisma.follower.findMany()
  }

  async findOne(id: number) : Promise<Follower> {
    return this.prisma.follower.findUnique({ where: { id }});
  }

  async update(id: number,
     updateFollowerDto: UpdateFollowerDto) : Promise<Follower> {
    return await this.prisma.follower.update({
      data: {...updateFollowerDto},
      where: { id }
    });
  }

  async remove(id: number) {
    return await this.prisma.follower.delete({ where: { id }});
  }
}
