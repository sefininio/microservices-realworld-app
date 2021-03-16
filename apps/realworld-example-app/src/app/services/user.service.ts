import { UserDto } from '@microservices-realworld-example-app/models';
import { PromisifyHttpService } from '@microservices-realworld-example-app/shared';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {

  userFeatureBaseUrl: string;

  constructor(
    private configService: ConfigService,
    private promisifyHttp: PromisifyHttpService,
  ) {
    this.userFeatureBaseUrl = this.configService.get<string>('features.user.baseUrl');
  }

  async getUser(id?:string, username?: string, email?: string): Promise<UserDto> {
    let url: string;

    if (id) {
      url = `${this.userFeatureBaseUrl}/user/${id}`;
    }

    if (username) {
      url = `${this.userFeatureBaseUrl}/user/username/${username}`;
    }

    if (email) {
      url = `${this.userFeatureBaseUrl}/user/email/${email}`;
    }

    return this.promisifyHttp.get(url);
  }

}
