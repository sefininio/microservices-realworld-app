import { IsNotEmpty, IsEmail } from 'class-validator';

/**
 * User update request object
 */
export class UpdateUserDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  readonly password: string;

  readonly bio: string;

  readonly image: string;
}
