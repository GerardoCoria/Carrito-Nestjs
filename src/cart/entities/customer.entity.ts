import { Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Customer extends Document{
  @Prop()
  name:string

  @Prop({required:true, type:Number})
  email: number;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
