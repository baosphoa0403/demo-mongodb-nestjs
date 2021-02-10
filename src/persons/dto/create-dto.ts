import  {IsString, IsNumber, IsNotEmpty} from "class-validator"

export class CreatePersonDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string; 
    @IsNotEmpty()
    @IsNumber()
    readonly age: number;
    @IsNotEmpty()
    @IsString() 
    readonly Email: string;

    @IsNotEmpty()
    @IsString() 
    readonly Password: string;
  }

  export interface loginPersonDTO {
    name: string,
    Password: string
  }
  export interface registerDTO{
    name: string,
    Password: string
  }