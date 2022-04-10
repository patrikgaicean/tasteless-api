import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { ConfigService } from '@nestjs/config';
 
@Injectable()
export class EmailService {
  private nodemailerTransport: Mail;
 
  constructor(
    private configService: ConfigService
  ) {
    this.nodemailerTransport = createTransport({
      service: this.configService.get('EMAIL_SERVICE'),
      auth: {
        type: 'OAuth2',
        user: this.configService.get('EMAIL_USER'),
        pass: this.configService.get('EMAIL_PASSWORD'),
        clientId: this.configService.get('OAUTH_CLIENTID'),
        clientSecret: this.configService.get('OAUTH_CLIENT_SECRET'),
        refreshToken: this.configService.get('OAUTH_REFRESH_TOKEN')
      }
    } as any);
  }
 
  sendMail(options: Mail.Options) {
    return this.nodemailerTransport.sendMail(options);
  }
}
