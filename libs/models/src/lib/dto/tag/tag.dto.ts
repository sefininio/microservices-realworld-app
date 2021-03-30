import { ApiProperty } from '@nestjs/swagger';

/**
 * Tag response
 */
export class TagDto {
  @ApiProperty()
  readonly _id: string;

  @ApiProperty()
  readonly tagName: string;
}
