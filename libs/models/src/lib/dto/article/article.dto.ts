import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Article response
 */
export class ArticleDto {
  @ApiProperty()
  readonly _id: string;

  @ApiProperty()
  readonly slug: string;

  @ApiProperty()
  readonly authorId: string;

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
