import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

/**
 * Tag create request object
 */
 export class CreateTagDto {
  @IsNotEmpty()
  @ApiProperty()
  readonly tagName: string;
}
