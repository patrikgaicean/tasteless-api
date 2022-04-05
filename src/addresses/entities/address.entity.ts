import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "../../orders/entities/order.entity";
import { User } from "../../users/entities/user.entity";

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn()
  address_id?: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  street: string;

  @Column()
  street_number: number;

  @Column()
  postal_code: number;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column()
  telephone: string;

  @ManyToOne(() => User, (owner: User) => owner.orders)
  @JoinColumn({ name: 'user_id' })
  owner?: User;

  @OneToMany(() => Order, (order: Order) => order.address)
  orders?: Order[];
}
