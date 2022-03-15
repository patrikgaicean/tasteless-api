import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  order_id?: number;

  @Column()
  user_id: number;

  @Column({ type: 'timestamptz' })
  order_date: Date;

  @Column()
  shipped: boolean;

  @Column()
  delivered: boolean;
}
