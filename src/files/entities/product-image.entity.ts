import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../products/entities/product.entity";

@Entity('product_images')
export class ProductImage {
  @PrimaryGeneratedColumn()
  image_id?: number;

  @Column({ nullable: true, default: null })
  key: string;

  @Column()
  product_id?: number;

  @ManyToOne(() => Product, (owner: Product) => owner.images)
  @JoinColumn({ name: 'product_id' })
  owner?: Product;
}
