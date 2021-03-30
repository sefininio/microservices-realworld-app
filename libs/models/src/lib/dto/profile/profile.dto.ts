import { ApiProperty } from '@nestjs/swagger';

/**
 * Profile response object
 */
export class ProfileDto {
  @ApiProperty()
  readonly _id: string;

  @ApiProperty()
  readonly username: string;

  @ApiProperty()
  readonly bio: string;

  @ApiProperty()
  readonly image: string;

  @ApiProperty()
  readonly following: boolean;
}
