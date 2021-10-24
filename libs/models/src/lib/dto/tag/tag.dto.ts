import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

/**
 * Tag response
 */
export class TagDto {
  @ApiProperty()
  readonly _id: ObjectId;

  @ApiProperty()
  readonly tagName: string;
}
