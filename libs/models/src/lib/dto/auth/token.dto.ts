import { IsNotEmpty } from 'class-validator';

/**
 * Auth token response
 */
export class TokenDto {

  @IsNotEmpty()
  readonly access_token: string;
}
