import { Body, Req, Controller, HttpCode, Post, UseGuards, Get, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './local.auth.guard';
import { RequestWithUser } from './interfaces/requestWithUser.interface';
import { ApiTags } from '@nestjs/swagger';
import { LogInDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt.auth.guard';
 
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  authenticate(@Req() req: RequestWithUser) {
    return req.user;
  }
 
  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authService.register(registrationData);
  }
 
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  async logIn(@Req() req: RequestWithUser, @Body() _: LogInDto) {
    const { user } = req; // takes the user out of the Basic Auth

    const cookie = this.authService.getCookieWithJwtToken(user.user_id);
    req.res.setHeader('Set-Cookie', cookie);

    return user;
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async logOut(@Req() req: RequestWithUser) {
    req.res.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
  }
}
