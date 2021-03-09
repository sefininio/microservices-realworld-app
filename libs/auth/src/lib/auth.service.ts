import { TokenDto, UserDto } from '@microservices-realworld-example-app/models';
import { PromisifyHttpService } from '@microservices-realworld-example-app/shared';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  userFeatureBaseUrl: string;

  constructor(
    private readonly jwtService: JwtService,
    private promisifyHttp: PromisifyHttpService,
    private readonly configService: ConfigService
  ) {
    this.userFeatureBaseUrl = this.configService.get<string>(
      'features.user.baseUrl'
    );
  }

  /**
   *
   * Note - we are storing the password in plain text in the DB for simplicity.
   * !!!!! DO NOT DO THIS FOR PRODUCTION !!!!!
   *
   * @param username string
   * @param password string
   *
   * @returns Promise<UserDto | null>
   */
  async validateUser(username: string, password: string): Promise<UserDto | null> {
    const user: UserDto = await this.promisifyHttp.get(
      `${this.userFeatureBaseUrl}/user/email/${username}`
    );

    if (user && user.password === password) {
      return user;
    }

    return null;
  }

  /**
   *
   * @param user UserDto
   *
   * @returns Promise<TokenDto>
   */
  async login(user: UserDto): Promise<TokenDto> {
    const payload = { username: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
