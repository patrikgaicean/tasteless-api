import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "../../orders/entities/order.entity";
import { Product } from "../../products/entities/product.entity";

@Entity('sales')
export class Sale {
  @PrimaryGeneratedColumn()
  sale_id?: number;

  @Column()
  order_id: number;
  
  @Column()
  product_id: number;

  @ManyToOne(() => Order, (order: Order) => order.sales)
  @JoinColumn({ name: 'order_id' })
  order?: Order;

  @OneToOne(() => Product)
  // @OneToMany(() => Product, (product: Product) => product.product_id)
  @JoinColumn({ name: 'product_id' })
  product?: Product;
}
