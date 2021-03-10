import { IsNotEmpty } from 'class-validator';

/**
 * Profile create request object
 */
 export class CreateProfileDto {

  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly image: string;

  @IsNotEmpty()
  readonly bio: string;
}
