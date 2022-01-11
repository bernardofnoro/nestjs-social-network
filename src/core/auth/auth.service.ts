import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/database.service';
import { JwtService } from '@nestjs/jwt';
import { Auth } from './entities/auth.entity';




@Injectable()
export class AuthService {
  validateUser(userId: string) {
    return this.prisma.user.findUnique({ where: { username: userId } });
  }
  constructor(
    private prisma:PrismaService,
    private jwtService:JwtService,
  ){}

  

  async login(username: string, password: string): Promise<Auth> {
    const user = await this.prisma.user.findUnique({ where: { username: username } });

    if (!user) {
      throw new NotFoundException(`No user found for username: ${username}`);
    }


    const passwordValid = user.password === password;
  
 if (!passwordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }
}






  



