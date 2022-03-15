import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  product_id?: number;

  @Column()
  disc_id: number;

  @Column() // TODO change to enum
  condition: string;

  @Column()
  price: number;

  @Column()
  deleted: boolean;

  @Column("int", { array: true, default: [] })
  images?: number[];
}
