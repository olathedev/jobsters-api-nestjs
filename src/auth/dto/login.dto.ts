import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class UserLoginDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}