import { IsDate, IsEmail, IsNotEmpty, IsString } from "class-validator";
import { IsCpf } from "src/common/validators";

export class CreateUserDto {
	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@IsDate()
	birthDate: Date;

	@IsCpf()
	@IsNotEmpty()
	@IsString()
	cpf: string;

	@IsNotEmpty()
	@IsString()
	password: string;
}
