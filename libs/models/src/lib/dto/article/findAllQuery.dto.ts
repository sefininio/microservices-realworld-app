
/**
 * Find all articles srequest object
 */
 export class FindAllArticleQueryDto {
  readonly tag: string;
  readonly author: string;
  readonly favorited: string;
  readonly limit: string;
  readonly offset: string;
}
