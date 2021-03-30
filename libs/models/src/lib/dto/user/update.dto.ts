import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

/**
 * User update request object
 */
export class UpdateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @ApiPropertyOptional()
  readonly password: string;

  @ApiPropertyOptional()
  readonly bio: string;

  @ApiPropertyOptional()
  readonly image: string;
}
