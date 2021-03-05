export class CommentDto {
  readonly authorId: string;
  readonly articleId: string;
  readonly body: string;
  readonly createdAt: Date;
  readonly deletedAt: Date;
}
