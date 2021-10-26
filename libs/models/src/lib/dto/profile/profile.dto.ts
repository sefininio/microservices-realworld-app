import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';

/**
 * Profile response object
 */
export class ProfileDto {
  @ApiProperty()
  readonly _id: ObjectId;

  @ApiProperty()
  readonly username: string;

  @ApiProperty()
  readonly bio: string;

  @ApiProperty()
  readonly image: string;

  @ApiProperty()
  readonly following: boolean;
}
