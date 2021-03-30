import { IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Article create request object
 */
export class CreateArticleDto {

  @IsNotEmpty()
  @ApiProperty()
  readonly title: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly description: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly body: string;

  @ApiPropertyOptional()
  readonly tagList: string[];
}
