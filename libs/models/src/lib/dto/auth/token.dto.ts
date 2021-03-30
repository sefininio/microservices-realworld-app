import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

/**
 * Auth token response
 */
export class TokenDto {

  @IsNotEmpty()
  @ApiProperty()
  readonly access_token: string;
}
