import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "../../addresses/entities/address.entity";
import { Sale } from "../../sales/entities/sale.entity";
import { User } from "../../users/entities/user.entity";
import { PaymentMethod, ShippingMethod } from "../dto/interfaces";

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  order_id?: number;

  @Column()
  user_id: number;

  @Column()
  address_id: number;

  @Column({ type: 'timestamptz' })
  order_date: Date;

  @Column({
    type: 'enum',
    enum: ShippingMethod,
    default: ShippingMethod.fedExEco
  })
  shipping_type: ShippingMethod;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    default: PaymentMethod.creditCard
  })
  payment_method: PaymentMethod;

  @Column({ default: true }) // mock the payment
  paid: boolean;

  @Column({ default: false })
  shipped: boolean;

  @Column({ default: false })
  delivered: boolean;

  @OneToMany(() => Sale, (sale: Sale) => sale.order)
  sales?: Sale[];
  
  @ManyToOne(() => User, (owner: User) => owner.orders)
  @JoinColumn({ name: 'user_id' })
  owner?: User;

  @ManyToOne(() => Address, (address: Address) => address.orders)
  @JoinColumn({ name: 'disc_id' })
  address?: Address;
}
