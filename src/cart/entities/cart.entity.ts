import { Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema()
export class Cart extends Document{
  @Prop()
  name:string

  @Prop({required:true, type:Number})
  price: number;

  @Prop({required:true, type:Number})
  quantity: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
