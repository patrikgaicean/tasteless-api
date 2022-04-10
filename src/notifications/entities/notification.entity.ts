import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Disc } from "../../discs/entities/disc.entity";
import { User } from "../../users/entities/user.entity";

@Entity('notifications')
@Unique('user_notification', ['user_id', 'disc_id'])
export class Notification {
  @PrimaryGeneratedColumn()
  notification_id?: number;

  @Column()
  user_id: number;

  @Column()
  disc_id: number;

  @Column({ default: false })
  enabled: boolean;

  @ManyToOne(() => User, (owner: User) => owner.notifications)
  @JoinColumn({ name: 'user_id' })
  owner?: User;

  @ManyToOne(() => Disc, (disc: Disc) => disc.notifications)
  @JoinColumn({ name: 'disc_id' })
  disc?: Disc;
}
