import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { RequestWithUserDto } from '../auth/interfaces/requestWithUser.interface';

@Controller('notifications')
@ApiTags('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Req() req: RequestWithUserDto, @Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto, req.user.userId);
  }

  @Get(':discId')
  @UseGuards(JwtAuthGuard)
  findByUserAndDiscId(@Req() req: RequestWithUserDto, @Param('discId') discId: string) {
    return this.notificationsService.findByUserAndDiscId(+discId, req.user.userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Req() req: RequestWithUserDto, @Param('id') id: string) {
    return this.notificationsService.removeForUser(+id, req.user.userId);
  }

}
