import { ApiPropertyOptional } from '@nestjs/swagger';
import { PageDto } from '../base/page.dto';

/**
 * Find all articles request object
 */
 export class FindAllArticleQueryDto extends PageDto {
  @ApiPropertyOptional()
  readonly tag: string;

  @ApiPropertyOptional()
  readonly author: string;

  @ApiPropertyOptional()
  readonly favorited: string;
}
