import { IsEmail, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public username: string;

  @IsOptional()
  public fullName: string;

  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;

  @IsString()
  @IsNotEmpty()
  public phone: string;
}

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  public username: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  public fullName: string;

  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public phone: string;
}
