import { PartialType } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from 'class-validator'

export class CustomerDto{
  @IsString({message: 'Debe ingresar texto'})
  @IsNotEmpty({message: "No debe estar vacío"})
  readonly name:string;

  @IsString({message: 'Debe ingresar texto'})
  @IsNotEmpty({message: "No debe estar vacío"})
  readonly email:string;
}

export class UpdateCustomerDto extends PartialType(CustomerDto){}
