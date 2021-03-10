import { IsNotEmpty } from 'class-validator';

/**
 * Profile update request object
 */
export class UpdateProfileDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly image: string;

  @IsNotEmpty()
  readonly bio: string;
}
