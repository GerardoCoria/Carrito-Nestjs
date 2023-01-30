import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsEmail, ValidateNested } from 'class-validator'

export class Skills{
  @IsNotEmpty()
  name:string;
  @IsNotEmpty()
  auth:boolean
}

export class CreateCustomerDto{
  @IsString({message: 'Debe ingresar texto'})
  @IsNotEmpty({message: "No debe estar vacío"})
  readonly name:string;

  @IsEmail()
  @IsNotEmpty({message: "No debe estar vacío"})
  readonly email:string;

  @ValidateNested()
  @Type(()=>Skills)
  readonly skills:Skills[];
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto){}
