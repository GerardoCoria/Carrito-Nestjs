import { Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

import { Skills } from "../dto/customer.dto";

@Schema()
export class Customer extends Document{
  @Prop()
  name:string

  @Prop({required:true})
  email: string

  /* @Prop({
    type:[{
      name: { type: String },
      auth: { type: Boolean }
    }]
  })
  skills: Types.Array<Record<string, any>>*/
  @Prop()
  skills: Skills[]
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
