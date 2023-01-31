import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User extends Document{
  @Prop()
  name:string;

  @Prop()
  email:string;

  @Prop(
    //{select:false}
    )
  password:string;

  @Prop({ required: true })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
