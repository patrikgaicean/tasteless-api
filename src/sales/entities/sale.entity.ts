import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "../../orders/entities/order.entity";
import { Product } from "../../products/entities/product.entity";

@Entity('sales')
export class Sale {
  @PrimaryGeneratedColumn()
  sale_id?: number;

  @Column()
  order_id: number;
  
  @Column({ unique: false })
  product_id: number;

  @ManyToOne(() => Order, (order: Order) => order.sales)
  @JoinColumn({ name: 'order_id' })
  order?: Order;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product?: Product;
}
