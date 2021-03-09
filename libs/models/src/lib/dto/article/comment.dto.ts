/**
 * Comment response
 */
export class CommentDto {
  readonly _id: string;
  readonly authorId: string;
  readonly articleId: string;
  readonly body: string;
  readonly createdAt: Date;
  readonly deletedAt: Date;
}
