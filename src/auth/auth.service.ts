import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './interfaces/tokenPayload.interface';
import { UsersRepository } from '../users/users.repository';
import { Role } from '../users/dto/interfaces';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  public async register(userData: RegisterDto, role: Role = Role.user) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    return await this.usersRepository.createUser({
      first_name: userData.firstName,
      last_name: userData.lastName,
      display_name: userData.displayName,
      email: userData.email,
      password: hashedPassword,
      role
    });
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    const { password, ...user } = await this.usersRepository.findByEmail(email);

    await this.verifyPassword(plainTextPassword, password);

    return user;
  }
   
  private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword
    );

    if (!isPasswordMatching) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }

  public getCookieWithJwtToken(userId: number) {
    const payload: TokenPayload = { userId };

    const token = this.jwtService.sign(payload);
    
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

  public async createAdminUser() {
    if ((await this.usersRepository.findOne()) == undefined) {
      const admin = {
        firstName: 'tasteless',
        lastName: 'admin',
        displayName: 'tladmin',
        email: this.configService.get('ADMIN_EMAIL'),
        password: this.configService.get('ADMIN_PASSWORD'),
      }

      await this.register(admin, Role.admin);
    }
  }
}
