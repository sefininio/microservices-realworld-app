import { ApiProperty } from '@nestjs/swagger';

/**
 * User response object
 */
export class UserDto {
  @ApiProperty()
  readonly _id: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly username: string;

  @ApiProperty()
  readonly password: string;

  @ApiProperty()
  readonly bio: string;

  @ApiProperty()
  readonly image: string;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;
}
