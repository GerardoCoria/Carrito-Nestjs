import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Product extends Document{
  @Prop({required:true, type:String})
  name: string;

  @Prop({required:true, type:String})
  description: string;

  @Prop({required:true, type:Number})
  price: number;

  @Prop({required:true, type:Number})
  stock:number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
