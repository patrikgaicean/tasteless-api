import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('discs')
export class Disc {
  @PrimaryGeneratedColumn()
  disc_id?: number;

  @Column()
  title: string;

  @Column()
  artist: string;

  @Column({ type: 'date' })
  release_date: Date;

  @Column() // TODO change to enum
  genre: string;

  @Column()
  description: string;

  @Column("text", { array: true })
  track_list: string[];

  @Column("int", { array: true, default: [] })
  images?: number[];
}
