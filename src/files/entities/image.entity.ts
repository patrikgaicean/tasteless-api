import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn()
  image_id?: number;

  @Column({ nullable: true, default: null })
  key: string;
}
