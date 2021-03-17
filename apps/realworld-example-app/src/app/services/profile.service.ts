import { ProfileDto } from '@microservices-realworld-example-app/models';
import { PromisifyHttpService } from '@microservices-realworld-example-app/shared';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProfileService {

  profileFeatureBaseUrl: string;

  constructor(
    private configService: ConfigService,
    private promisifyHttp: PromisifyHttpService,
  ) {
    this.profileFeatureBaseUrl = this.configService.get<string>('features.profile.baseUrl');
  }

  async getProfile(username: string, authHeader: any): Promise<ProfileDto> {
    const url = `${this.profileFeatureBaseUrl}/profiles/${username}`;
    return await this.promisifyHttp.get(url, {headers: authHeader});
  }

  async addFollow(username: string, authHeader: any): Promise<ProfileDto> {
    const url = `${this.profileFeatureBaseUrl}/profiles/${username}/follow`;
    const profile = await this.promisifyHttp.post(url, {}, {headers: authHeader});
    return profile;
  }

  async removeFollow(username: string, authHeader: any): Promise<ProfileDto> {
    const url = `${this.profileFeatureBaseUrl}/profiles/${username}/follow`;
    return await this.promisifyHttp.delete(url, {headers: authHeader});
  }

}
