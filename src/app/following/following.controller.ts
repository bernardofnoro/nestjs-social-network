import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FollowingService } from './following.service';
import { CreateFollowingDto } from './dto/create-following.dto';
import { UpdateFollowingDto } from './dto/update-following.dto';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';

@Controller('following')
export class FollowingController {
  constructor(private readonly followingService: FollowingService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createFollowingDto: CreateFollowingDto) {
    return this.followingService.create(createFollowingDto);
  }

  @Get()
  findAll() {
    return this.followingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.followingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFollowingDto: UpdateFollowingDto) {
    return this.followingService.update(+id, updateFollowingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.followingService.remove(+id);
  }
}
