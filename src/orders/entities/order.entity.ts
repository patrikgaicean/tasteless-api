import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Sale } from "../../sales/entities/sale.entity";
import { User } from "../../users/entities/user.entity";

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  order_id?: number;

  @Column()
  user_id: number;

  @Column({ type: 'timestamptz' })
  order_date: Date;

  @Column({ default: false })
  shipped: boolean;

  @Column({ default: false })
  delivered: boolean;

  @OneToMany(() => Sale, (sale: Sale) => sale.order)
  sales?: Sale[];
  
  @ManyToOne(() => User, (owner: User) => owner.orders)
  @JoinColumn({ name: 'user_id' })
  owner?: User;
}
