import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';

/**
 * User response object
 */
export class UserDto {
  @ApiProperty()
  readonly _id?: ObjectId;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly username: string;

  @ApiProperty()
  readonly password: string;

  @ApiProperty()
  readonly bio?: string;

  @ApiProperty()
  readonly image?: string;

  @ApiProperty()
  readonly createdAt?: Date;

  @ApiProperty()
  readonly updatedAt?: Date;
}
