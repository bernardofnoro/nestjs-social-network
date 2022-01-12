import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../core/auth/guards/jwt-auth.guard';

import { FollowingService } from './following.service';
import { CreateFollowingDto } from './dto/create-following.dto';
import { UpdateFollowingDto } from './dto/update-following.dto';
import { FollowingEntity } from './entities/following.entity';

@ApiTags('following')
@Controller('following')
export class FollowingController {
  constructor(private readonly followingService: FollowingService) {}

  @Get()
  @ApiOkResponse({ type: [FollowingEntity] })
  findAll() {
    return this.followingService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: [FollowingEntity] })
  findOne(@Param('id') id: string) {
    return this.followingService.findOne(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: FollowingEntity })
  create(@Body() createFollowingDto: CreateFollowingDto) {
    return this.followingService.create(createFollowingDto);
  }

  
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: FollowingEntity })
  update(@Param('id') id: string, @Body() updateFollowingDto: UpdateFollowingDto) {
    return this.followingService.update(+id, updateFollowingDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: [FollowingEntity] })
  remove(@Param('id') id: string) {
    return this.followingService.remove(+id);
  }
}
