import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

/**
 * Comment create request object
 */
 export class CreateArticleCommentDto {
  @IsNotEmpty()
  @ApiProperty()
  readonly body: string;
}
