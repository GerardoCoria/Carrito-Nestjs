import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

import { Brand } from "../entities/brand.entity";

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

  @Prop(raw({
    name: { type : String }
  }))
  category : Record<string, any>;

  @Prop({type: Types.ObjectId, ref: Brand.name})
  brand : Brand | Types.ObjectId;

  @Prop({required:true, type:Date})
  expires:Date;

  @Prop({required:true, type:String})
  batch:string;

  @Prop({type:String})
  keys:string
}

export const ProductSchema = SchemaFactory.createForClass(Product);
