import { ApiPropertyOptional } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

/**
 * Comment response
 */
export class CommentDto {
  @ApiPropertyOptional()
  readonly _id: ObjectId;

  @ApiPropertyOptional()
  readonly authorId: ObjectId;

  @ApiPropertyOptional()
  readonly articleId: ObjectId;

  @ApiPropertyOptional()
  readonly body: string;

  @ApiPropertyOptional()
  readonly createdAt: Date;

  @ApiPropertyOptional()
  readonly deletedAt: Date;
}
