import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn()
  notification_id?: number;

  @Column()
  user_id: number;

  @Column({ default: false })
  enabled: boolean;

  @ManyToOne(() => User, (owner: User) => owner.notifications)
  @JoinColumn({ name: 'user_id' })
  owner?: User;
}
