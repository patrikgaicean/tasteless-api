import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Disc } from "../../discs/entities/disc.entity";
import { User } from "../../users/entities/user.entity";

@Entity('wishlist')
@Unique('user_disc', ['user_id', 'disc_id'])
export class Wishlist {
  @PrimaryGeneratedColumn()
  wishlist_id?: number;

  @Column()
  user_id: number;
  
  @Column()
  disc_id: number;

  @ManyToOne(() => Disc)
  @JoinColumn({ name: 'disc_id' })
  disc?: Disc;

  @ManyToOne(() => User, (owner: User) => owner.wishlist_items)
  @JoinColumn({ name: 'user_id' })
  owner?: User;
}
