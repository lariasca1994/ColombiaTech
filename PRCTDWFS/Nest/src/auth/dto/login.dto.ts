import { IsEmail, IsNegative, IsNotEmpty, IsString, isNotEmpty } from "class-validator";


export class LoginDto{
@IsNotEmpty()
@IsEmail({}, {message: 'El correo no tiene un formato valido'})
readonly email: string;
@IsString()
@IsNotEmpty()
readonly password : string;

}