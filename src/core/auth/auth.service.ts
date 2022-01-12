import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/database.service';
import { JwtService } from '@nestjs/jwt';
import { Auth } from './entities/auth.entity';
import * as bcrypt from 'bcrypt'


@Injectable()
export class AuthService {
  constructor(private prisma:PrismaService, private jwtService:JwtService) { }

  async login(username: string, password: string): Promise<Auth> {
    const user = await this.prisma.user.findUnique({ where: { username: username } });

    if (!user) {
      throw new NotFoundException(`No user found for username: ${username}`);
    }

    const passwordValid = await bcrypt.compare( password , user.password );
  
 if (!passwordValid) { 
    throw new UnauthorizedException('Invalid password');
    }

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }

  validateUser(userId: any) {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }
}






  



