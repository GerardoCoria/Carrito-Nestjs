import { PartialType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto{
  @IsString()
  @IsNotEmpty()
  readonly name:string;

  @IsEmail()
  @IsNotEmpty()
  readonly email:string;

  @IsNotEmpty()
  readonly password:string;

  @IsNotEmpty()
  readonly role:string;
}

export class UpdateUserDto extends PartialType(CreateUserDto){};

