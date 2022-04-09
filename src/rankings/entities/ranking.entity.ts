import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Disc } from "../../discs/entities/disc.entity";
import { User } from "../../users/entities/user.entity";

@Entity('rankings')
@Unique('user_ranking', ['user_id', 'disc_id'])
export class Ranking {
  @PrimaryGeneratedColumn()
  ranking_id?: number;

  @Column()
  user_id: number;

  @Column()
  disc_id: number;

  @Column({ type: 'decimal', precision: 3, scale: 2 })
  rank: number;

  @ManyToOne(() => Disc)
  @JoinColumn({ name: 'disc_id' })
  disc?: Disc;

  @ManyToOne(() => User, (owner: User) => owner.wishlist_items)
  @JoinColumn({ name: 'user_id' })
  owner?: User;
}
