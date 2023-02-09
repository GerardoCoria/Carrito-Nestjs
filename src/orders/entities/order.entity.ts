import { Prop, Schema, SchemaFactory, raw} from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import { Document, Types } from "mongoose";

import { Customer } from "src/users/entities/customer.entity";
import { User } from "src/users/entities/user.entity";
import { Product } from "../../products/entities/product.entity";

export class Items{
  @IsNotEmpty()
  item:Product;
  @IsNotEmpty()
  quantity:number
}

@Schema()
export class Order extends Document{
  @Prop()
  name:string

  @Prop({required:true, type:Date})
  date:Date;

  //VER CUAL DEJO:SI USER O COSTUMERS
/*   @Prop({type: Types.ObjectId, ref: Customer.name, required:true})
  customer: Customer | Types.ObjectId; */
  @Prop({type: Types.ObjectId, ref: User.name, required:true})
  customer: User | Types.ObjectId;

  @Prop({
    type: [{ type: Types.ObjectId,
    ref: Product.name }]
  })
  products: Types.Array<Product>;

}

export const OrderSchema = SchemaFactory.createForClass(Order);
