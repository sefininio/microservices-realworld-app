/**
 * Profile response object
 */
export class ProfileDto {
  readonly _id: string;
  readonly username: string;
  readonly bio: string;
  readonly image: string;
  readonly following: boolean;
}
