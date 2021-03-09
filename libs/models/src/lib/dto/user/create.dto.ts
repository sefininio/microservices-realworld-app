import { IsNotEmpty, IsEmail } from 'class-validator';

/**
 * User create request object
 */
 export class CreateUserDto {

  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
