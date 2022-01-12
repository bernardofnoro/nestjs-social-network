import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/shared/database/database.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(private prisma:PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    data.password = await bcrypt.hash(data.password, 10);
    return await this.prisma.user.create({ data });
  }

  // async create(createUserDto: CreateUserDto): Promise<User> {
  //   return await this.prisma.user.create({
  //     data: {...createUserDto},
  //   });
  // }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  };

   async findOne(id: number) : Promise<User> {
    return await this.prisma.user.findUnique({ where: {id}});
  };

   async update(id: number,
     updateUserDto: UpdateUserDto): Promise<User> {
    return await this.prisma.user.update({
      data: {...updateUserDto},
      where: { id },
    });
  };

  async remove(id: number) {
    return await this.prisma.user.delete({where: { id }});
  }
}
