import { Controller, Get,Header, UseGuards, Post,Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private anuthService:AuthService) {}

  // @Get()
  // @Header('Content-Type', 'text/html')
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req){
    return this.anuthService.login(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req){
    return req.user;
  }
}
