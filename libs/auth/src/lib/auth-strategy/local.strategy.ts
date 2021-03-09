import { UserDto } from '@microservices-realworld-example-app/models';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(
    private authService: AuthService,
  ) {
    super();
  }

  /**
   *
   * @param username string
   * @param password string
   *
   * @returns Promise<UserDto>
   */
  async validate(username: string, password: string): Promise<UserDto> {
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

}
