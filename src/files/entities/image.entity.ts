import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn()
  image_id?: number;

  @Column() // TODO change to enum (disc/product)
  type: string;
  
  @Column() // TODO change to enum (url from aws or path from filesystem)
  location: string;
  
  @Column({ nullable: true, default: null }) // if AWS
  key: number;

  @Column()
  deleted: boolean;
}
