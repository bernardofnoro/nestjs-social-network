import { ApiProperty } from '@nestjs/swagger';
import { Following, Prisma } from '@prisma/client';

export class FollowingEntity implements Following {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  userid: number;

  @ApiProperty()
  createdAt: Date; 
}
