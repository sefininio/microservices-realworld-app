import { UserDto } from '@microservices-realworld-example-app/models';
import { PromisifyHttpService } from '@microservices-realworld-example-app/shared';
import { HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Args, Context, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ExtendedGqlExecutionContext } from '../extended-gql-context';
import { Article } from '../models/article.model';
import { User } from '../models/user.model';

@Resolver(of => User)
export class UserResolver {

  userFeatureBaseUrl: string;
  articleFeatureBaseUrl: string;

  constructor(
    private configService: ConfigService,
    private promisifyHttp: PromisifyHttpService,
  ) {
    this.userFeatureBaseUrl = this.configService.get<string>('features.user.baseUrl');
    this.articleFeatureBaseUrl = this.configService.get<string>('features.article.baseUrl');
  }

  @Query(returns => User, { name: 'user' })
  async getUser(
    @Args('id', { nullable: true }) id?: string,
    @Args('username', { nullable: true }) username?: string,
    @Args('email', { nullable: true }) email?: string,
  ) {

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

    const user: UserDto = await this.promisifyHttp.get(url);

    return user;
  }

  /**
   *
   * @param user the user's articles
   */
  @ResolveField(returns => [Article], { name: 'articles' })
  async getArticles(
    @Context() ctx: ExtendedGqlExecutionContext,
    @Parent() user: User
  ) {
    const { username } = user;
    const url = `${this.articleFeatureBaseUrl}/articles?author=${username}`;

    return await this.promisifyHttp.get(url);
  }

  @ResolveField(returns => [Article], {name: 'feed'})
  async getFeed(
    @Context() ctx: ExtendedGqlExecutionContext,
    @Parent() user: User,
  ) {
    const headers = this.promisifyHttp.getHeaders({
      "Authorization": `Bearer ${ctx.req.headers.token}`,
    });

    const url = `${this.articleFeatureBaseUrl}/articles/feed`;

    return await this.promisifyHttp.get(url, {headers});
  }

}
