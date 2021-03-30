import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * page request object
 */
export class PageDto {
  @ApiPropertyOptional()
  readonly limit: string;

  @ApiPropertyOptional()
  readonly offset: string;
}
