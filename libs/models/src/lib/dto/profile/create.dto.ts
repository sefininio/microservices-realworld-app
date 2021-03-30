import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

/**
 * Profile create request object
 */
 export class CreateProfileDto {

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
