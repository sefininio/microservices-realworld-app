import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

/**
 * Profile update request object
 */
export class UpdateProfileDto {
  @IsNotEmpty()
  @ApiProperty()
  readonly username: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly image: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly bio: string;
}
