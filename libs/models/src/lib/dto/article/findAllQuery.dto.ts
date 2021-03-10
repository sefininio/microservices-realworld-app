import { PageDto } from '../base/page.dto';

/**
 * Find all articles request object
 */
 export class FindAllArticleQueryDto extends PageDto {
  readonly tag: string;
  readonly author: string;
  readonly favorited: string;
}
