import { User } from '../../users/entities/user.entity'
import { Product } from "../../products/entities/product.entity";

export class Cart{
  id: number;
  name: string;
  description: string;
  price: number;
}

export class Order{
  date: Date;
  user: User;
  products: Product[]
}
