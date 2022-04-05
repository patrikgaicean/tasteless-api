import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DiscImage } from "../../files/entities/disc-image.entity";
import { Product } from "../../products/entities/product.entity";
import { Genre } from "../dto/interfaces";

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

  @Column({
    type: 'enum',
    enum: Genre
  })
  genre: Genre;

  @Column()
  description: string;

  @Column("text", { array: true })
  track_list: string[];

  @OneToMany(() => Product, (product: Product) => product.disc)
  products?: Product[];

  @OneToMany(() => DiscImage, (disc: DiscImage) => disc.owner)
  images?: DiscImage[];
}
