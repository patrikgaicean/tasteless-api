import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "../../addresses/entities/address.entity";
import { Notification } from "../../notifications/entities/notification.entity";
import { Order } from "../../orders/entities/order.entity";
import { Wishlist } from "../../wishlist/entities/wishlist.entity";
import { Role } from "../dto/interfaces";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  user_id?: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  display_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password?: string;

  @Column({ type: 'enum', enum: Role, default: Role.user })
  role: Role;

  @OneToMany(() => Address, (address: Address) => address.owner)
  addresses?: Address[];

  @OneToMany(() => Order, (order: Order) => order.owner)
  orders?: Order[];

  @OneToMany(() => Wishlist, (wishlist: Wishlist) => wishlist.owner)
  wishlist_items?: Wishlist[];

  @OneToMany(() => Notification, (notification: Notification) => notification.owner)
  notifications?: Notification[];
}
