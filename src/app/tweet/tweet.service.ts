import { Injectable } from '@nestjs/common';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { Tweet } from '@prisma/client';
import { PrismaService } from 'src/shared/database/database.service';

@Injectable()
export class TweetService {
  constructor(private prisma:PrismaService) {}


  async create(createTweetDto: CreateTweetDto): Promise<Tweet> {
    return this.prisma.tweet.create({
      data: {...createTweetDto},
    });
  }

  async findAll(): Promise<Tweet[]> {
    return await this.prisma.tweet.findMany();
  }

  async findOne(id: number) :Promise<Tweet> {
    return await this.prisma.tweet.findUnique({ where: { id }});
  }

  async update(id: number,
     updateTweetDto: UpdateTweetDto): Promise<Tweet> {
    return this.prisma.tweet.update({
      data: {...updateTweetDto},
      where: { id },
    });
  }

   async remove(id: number) {
    return this.prisma.tweet.delete({where: { id } });
  };
}
