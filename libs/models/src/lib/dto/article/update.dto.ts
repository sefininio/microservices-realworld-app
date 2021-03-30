import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Article update request object
 */
export class UpdateArticleDto {
  @ApiPropertyOptional()
  readonly title: string;

  @ApiPropertyOptional()
  readonly description: string;

  @ApiPropertyOptional()
  readonly body: string;

  @ApiPropertyOptional()
  readonly tagList: string[];
}
