import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationDto } from './dto/notification.dto';
import { Notification } from './entities/notification.entity';
import { NotificationsRepository } from './notifications.repository';

@Injectable()
export class NotificationsService {

  constructor(
    private notificationsRepository: NotificationsRepository
  ) {}

  async create(createNotificationDto: CreateNotificationDto, userId: number) {
    const entity: Notification = await this.notificationsRepository.createNotification(
      this.toEntity({ userId, enabled: true, ...createNotificationDto })
    );

    return this.toDto(entity);
  }

  async findByUserAndDiscId(discId: number, userId: number) {
    const entity: Notification = await this.notificationsRepository.findByUserAndDiscId(discId, userId);

    if (!entity) {
      return;
    }

    return this.toDto(entity);
  }

  async findByDiscId(discId: number) {
    const entities: Notification[] = await this.notificationsRepository.findByDiscId(discId);
    
    return entities.map(e => {
      return {
        ...this.toDto(e),
        discTitle: e.disc.title,
        discArtist: e.disc.artist
      }
    });
  }

  async removeForUser(id: number, userId: number) {
    return await this.notificationsRepository.removeForUser(id, userId);
  }

  toEntity(dto: NotificationDto): Notification {
    return {
      notification_id: dto.notificationId,
      user_id: dto.userId,
      disc_id: dto.discId,
      enabled: dto.enabled
    }
  }

  toDto(entity: Notification): NotificationDto {
    return {
      notificationId: entity.notification_id,
      userId: entity.user_id,
      discId: entity.disc_id,
      enabled: entity.enabled
    }
  }

}
