import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('wishlist')
export class Wishlist {
  @PrimaryGeneratedColumn()
  wishlist_id?: number;

  @Column()
  user_id: number;
  
  @Column()
  disc_id: number;
}
