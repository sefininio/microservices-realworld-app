/**
 * User response object
 */
export class UserDto {
  readonly _id: string;
  readonly email: string;
  readonly username: string;
  readonly password: string;
  readonly bio: string;
  readonly image: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
