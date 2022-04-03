import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Disc } from "../../discs/entities/disc.entity";

@Entity('disc_images')
export class DiscImage {
  @PrimaryGeneratedColumn()
  image_id?: number;

  @Column({ nullable: true, default: null })
  key: string;

  @Column()
  disc_id?: number;

  @Column({ default: false })
  main: boolean;

  @ManyToOne(() => Disc, (owner: Disc) => owner.images)
  @JoinColumn({ name: 'disc_id' })
  owner?: Disc;
}
