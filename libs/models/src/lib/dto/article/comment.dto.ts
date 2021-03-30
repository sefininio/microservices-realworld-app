import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Comment response
 */
export class CommentDto {
  @ApiPropertyOptional()
  readonly _id: string;

  @ApiPropertyOptional()
  readonly authorId: string;

  @ApiPropertyOptional()
  readonly articleId: string;

  @ApiPropertyOptional()
  readonly body: string;

  @ApiPropertyOptional()
  readonly createdAt: Date;

  @ApiPropertyOptional()
  readonly deletedAt: Date;
}
