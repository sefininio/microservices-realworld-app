/**
 * Article update request object
 */
 export class UpdateArticleDto {
  readonly title: string;
  readonly description: string;
  readonly body: string;
  readonly tagList: string[];
}
