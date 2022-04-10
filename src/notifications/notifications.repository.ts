import { HttpException, HttpStatus } from "@nestjs/common";
import {EntityRepository, Repository} from "typeorm";
import PostgresErrorCode from "../database/postgresErrorCode.enum";
import { Notification } from "./entities/notification.entity";

@EntityRepository(Notification)
export class NotificationsRepository extends Repository<Notification> {

  async createNotification(data: Notification): Promise<Notification> {
    const entity: Notification = this.create(data);

    try {
      await this.save(entity);
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        return;
      }
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return entity;
  }

  async findByUserAndDiscId(disc_id: number, user_id: number): Promise<Notification> {
    const entity = await this.findOne({ disc_id, user_id });

    if (!entity) {
      return;
    }

    return entity;
  }

  async findByDiscId(disc_id: number): Promise<Notification[]> {
    return await this.find({ where: { disc_id }, relations: ['disc' ]});
  }

  async removeForUser(notification_id: number, user_id: number) {
    return await this.delete({ notification_id, user_id });
  }
}
