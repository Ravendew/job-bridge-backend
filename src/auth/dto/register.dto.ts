import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  fullName: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  mobile: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;
}
