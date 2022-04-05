import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Disc } from "../../discs/entities/disc.entity";
import { ProductImage } from "../../files/entities/product-image.entity";
import { Condition } from "../dto/interfaces";

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  product_id?: number;

  @Column()
  disc_id: number;

  @Column({
    type: 'enum',
    enum: Condition
  })
  condition: Condition;

  @Column({ type: 'float' })
  price: number;

  @Column({ default: false })
  deleted?: boolean;

  @ManyToOne(() => Disc, (disc: Disc) => disc.products)
  @JoinColumn({ name: 'disc_id' })
  disc?: Disc;

  @OneToMany(() => ProductImage, (product: ProductImage) => product.owner)
  images?: ProductImage[];
}
