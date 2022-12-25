import { IsDefined, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty()
  @IsEmail()
  @IsDefined()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  firstname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  lastname: string;

  @ApiProperty()
  @MinLength(8)
  @IsDefined()
  password: string;
}
