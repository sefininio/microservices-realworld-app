import { IsNotEmpty } from 'class-validator';

/**
 * Comment create request object
 */
 export class CreateArticleCommentDto {
  @IsNotEmpty()
  readonly body: string;
}
