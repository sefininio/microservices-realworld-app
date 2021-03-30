import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

/**
 * User create request object
 */
 export class CreateUserDto {

  @IsNotEmpty()
  @ApiProperty()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly password: string;
}
