import { Args, Context, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ExtendedGqlExecutionContext } from '../extended-gql-context';
import { Article } from '../models/article.model';
import { User } from '../models/user.model';
import { ArticleService } from '../services/article.service';
import { UserService } from '../services/user.service';

@Resolver(of => User)
export class UserResolver {

  constructor(
    private userService: UserService,
    private articleService: ArticleService,
  ) {}

  @Query(returns => User, { name: 'user' })
  async getUser(
    @Args('id', { nullable: true }) id?: string,
    @Args('username', { nullable: true }) username?: string,
    @Args('email', { nullable: true }) email?: string,
  ) {

    return this.userService.getUser(id, username, email);
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
    return this.articleService.getUserArticles(username);
  }

  @ResolveField(returns => [Article], {name: 'feed'})
  async getFeed(
    @Context() ctx: ExtendedGqlExecutionContext,
    @Parent() user: User,
  ) {
    const authHeader = {
      "Authorization": `Bearer ${ctx.token}`,
    };

    return this.articleService.getUserFeed(authHeader);
  }

  // @ResolveField(returns => Profile, {name: 'profile'})
  // async getProfile(
  //   @Context() ctx: ExtendedGqlExecutionContext,
  //   @Parent() user: User,
  // ) {
  //   const authHeader = {
  //     "Authorization": `Bearer ${ctx.token}`,
  //   };

  //   return this.articleService.getUserFeed(authHeader);
  // }

}
