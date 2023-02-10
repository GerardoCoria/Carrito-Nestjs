import { OmitType, PartialType } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsDate, IsMongoId, IsArray, IsNumber } from 'class-validator'

export class CreateOrderDto{
  @IsString({message: 'Debe ingresar texto'})
  @IsNotEmpty({message: "No debe estar vacío"})
  readonly name:string;

  @IsNotEmpty()
  @IsDate()
  readonly date:Date;

  @IsNotEmpty()
  @IsMongoId()
  readonly customer: string;

  @IsNotEmpty()
  @IsArray()
  readonly products:string[];
}

export class UpdateOrderDto extends PartialType(
  OmitType(CreateOrderDto, ['products']),
){}

export class AddProductsToOrderDto{
  @IsNotEmpty()
  @IsArray()
  readonly products:string;
}
