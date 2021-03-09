import { UserDto } from '@microservices-realworld-example-app/models';
import { PromisifyHttpService } from '@microservices-realworld-example-app/shared';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  userFeatureBaseUrl: string;

  constructor(
    private configService: ConfigService,
    private promisifyHttp: PromisifyHttpService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('auth.secret'),
    });
    this.userFeatureBaseUrl = this.configService.get<string>('features.user.baseUrl');
  }

  /**
   *
   * @param payload {username, password}
   *
   * @returns Promise<UserDto>
   */
  async validate(payload: any): Promise<UserDto> {
    return await this.promisifyHttp.get(`${this.userFeatureBaseUrl}/user/email/${payload.username}`);
  }

}
