import { ApiProperty } from '@nestjs/swagger';
import { User, Prisma } from '@prisma/client';

export class UserEntity implements User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  about: string;

  @ApiProperty()
  birthday: string;

  @ApiProperty()
  createdAt: Date;
}
