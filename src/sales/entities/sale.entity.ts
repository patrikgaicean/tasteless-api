import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('sales')
export class Sale {
  @PrimaryGeneratedColumn()
  sale_id?: number;

  @Column()
  order_id: number;
  
  @Column()
  product_id: number;
}
