import { IsNotEmpty } from 'class-validator';

/**
 * Tag create request object
 */
 export class CreateTagDto {
  @IsNotEmpty()
  readonly tagName: string;
}
