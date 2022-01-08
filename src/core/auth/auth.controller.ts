import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { LoginDto } from './dto/login.dto'

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: Auth })
  login(@Body() { username, password }: LoginDto) {
    return this.authService.login(username, password);
  }
 

}
