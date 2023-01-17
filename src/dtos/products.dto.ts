import { IsString, IsNumber, IsNotEmpty, IsPositive } from 'class-validator'
import { PartialType } from "@nestjs/mapped-types";


export class CreateProductDto{
  @IsString({message: 'Debe ingresar texto'})
  @IsNotEmpty()
  readonly name:string;
  @IsString({message: 'Debe ingresar texto'})
  @IsNotEmpty()
  readonly description:string;
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price:number;
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly stock:number;
}

export class UpdateProductDto extends PartialType(CreateProductDto){}
