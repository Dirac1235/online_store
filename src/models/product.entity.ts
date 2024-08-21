import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './item.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number | string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  price: number;

  @OneToMany(() => Item, (item) => item.product)
  items: Item[];
  getId(): string | number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  getImage(): string {
    return this.image;
  }

  getPrice(): number {
    return this.price;
  }
  setName(name: string): void {
    this.name = name;
  }

  setDescription(description: string): void {
    this.description = description;
  }

  setImage(image: string): void {
    this.image = image;
  }

  setPrice(price: number): void {
    this.price = price;
  }
  getItems(): Item[] {
    return this.items;
  }
  setItems(items: Item[]) {
    this.items = items;
  }
  static sumPricesByQuantities(products: Product[], productsInSession): number {
    let total = 0;
    for (let i = 0; i < products.length; i++) {
      total =
        total + products[i].getPrice() * productsInSession[products[i].getId()];
    }
    return total;
  }
}
