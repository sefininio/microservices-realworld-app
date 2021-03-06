export class ArticleDto {
  readonly _id: string;
  readonly slug: string;
  readonly authorId: string;
  readonly title: string;
  readonly description: string;
  readonly body: string;
  readonly tagList: string[];
  readonly favoritesCount: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date;
}
