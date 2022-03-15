import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
