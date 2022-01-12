import { ApiProperty } from '@nestjs/swagger';
import { Follower } from '@prisma/client';

export class FollowerEntity implements Follower {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  userid: number;

  @ApiProperty()
  createdAt: Date; 
}
