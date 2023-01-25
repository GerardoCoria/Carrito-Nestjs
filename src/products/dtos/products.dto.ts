import { IsString, IsNumber, IsNotEmpty, IsPositive } from 'class-validator'
import { PartialType, ApiProperty} from "@nestjs/swagger";

export class CreateProductDto{
  @IsString({message: 'Debe ingresar texto'})
  @IsNotEmpty({message: "No debe estar vacío"})
  readonly name:string;

  @IsString({message: 'Debe ingresar texto'})
  @IsNotEmpty({message: "No debe estar vacío"})
  readonly description:string;

  @IsNumber({allowNaN:false}, {message: "Debe ser un número"})
  @IsNotEmpty({message: "No debe estar vacío"})
  @IsPositive({message: "El número debe ser mayor a cero."})
  @ApiProperty({description: 'El precio está expresado en pesos y en dólares (valor libre).'})
  readonly price:number;

  @IsNumber({allowNaN:false}, {message: "Debe ser un número"})
  @IsNotEmpty({message: "No debe estar vacío"})
  @IsPositive({message: "El número debe ser mayor a cero."})
  readonly stock:number;
}

export class UpdateProductDto extends PartialType(CreateProductDto){}
