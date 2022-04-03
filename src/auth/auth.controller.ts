import { Body, Req, Controller, HttpCode, Post, UseGuards, Get, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './local.auth.guard';
import { RequestWithUser, RequestWithUserDto } from './interfaces/requestWithUser.interface';
import { ApiTags } from '@nestjs/swagger';
import { LogInDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt.auth.guard';
import { UsersService } from '../users/users.service';
import { UserDto } from '../users/dto/user.dto';
 
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  authenticate(@Req() req: RequestWithUserDto): UserDto {
    return req.user;
  }
 
  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    const entity = await this.authService.register(registrationData);

    return this.usersService.toDto(entity);
  }
 
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  async logIn(@Req() req: RequestWithUser, @Body() _: LogInDto) {
    const { user } = req; // takes the user out of the Basic Auth

    const cookie = this.authService.getCookieWithJwtToken(user.user_id);
    req.res.setHeader('Set-Cookie', cookie);

    return this.usersService.toDto(user);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async logOut(@Req() req: RequestWithUser) {
    req.res.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
  }
}
