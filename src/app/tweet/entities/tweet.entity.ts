import { ApiProperty } from '@nestjs/swagger';
import { Tweet, Prisma } from '@prisma/client';

export class TweetEntity implements Tweet {
  @ApiProperty()
  id: number;

  @ApiProperty()
  content: string;

  @ApiProperty()
  userid: number;
  
  @ApiProperty()
  createdAt: Date;
}