import { IsNotEmpty } from 'class-validator';

/**
 * Article create request object
 */
export class CreateArticleDto {

  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly body: string;

  readonly tagList: string[];
}
