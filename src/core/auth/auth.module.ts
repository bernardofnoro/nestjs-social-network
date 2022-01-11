import { JwtStrategy } from './guards/jwstrategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';


export const jwtSecret = process.env.jwtSecret; //👈 acess the .env file to get our jwtsecret

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '300s' }, // 👈 set the token timer
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // 👈 expose JwtStrategy
})
export class AuthModule {}

