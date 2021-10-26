import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';

/**
 * Article response
 */
export class ArticleDto {
  @ApiProperty()
  readonly _id: ObjectId;

  @ApiProperty()
  readonly slug: string;

  @ApiProperty()
  readonly authorId: ObjectId;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly body: string;

  @ApiPropertyOptional()
  readonly tagList: string[];

  @ApiProperty()
  readonly favoritesCount: number;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;

  @ApiProperty()
  readonly deletedAt: Date;
}
