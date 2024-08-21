import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  role: string;
  @Column()
  balance: number;
  getId(): string {
    return this.id;
  }
  setId(id: string) {
    this.id = id;
  }
  getName(): string {
    return this.name;
  }
  setName(name: string) {
    this.name = name;
  }
  getEmail(): string {
    return this.email;
  }
  setEmail(email: string) {
    this.email = email;
  }
  getPassword(): string {
    return this.password;
  }
  setPassword(password: string) {
    this.password = password;
  }
  getRole(): string {
    return this.role;
  }
  setRole(role: string) {
    this.role = role;
  }
  getBalance(): number {
    return this.balance;
  }
  setBalance(balance: number) {
    this.balance = balance;
  }
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
  getOrder(): Order[] {
    return this.orders;
  }
  setOrder(orders: Order[]) {
    this.orders = orders;
  }
}
