import { Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

import { Customer } from "src/users/entities/customer.entity";
import { Product } from "../../products/entities/product.entity";

@Schema()
export class Order extends Document{
  @Prop()
  name:string

  @Prop({required:true, type:Date})
  date:Date;

  @Prop({type: Types.ObjectId, ref: Customer.name, required:true})
  customer: Customer | Types.ObjectId;

  @Prop({type: [{ type: Types.ObjectId, ref: Product.name }]})
  products: Types.Array<Product>;
}

export const OrderSchema = SchemaFactory.createForClass(Order);