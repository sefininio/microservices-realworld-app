/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ExtendedGqlExecutionContext } from '../extended-gql-context';
import { Article } from '../models/article.model';
import { User } from '../models/user.model';
import { UserCreateInput } from '../models/userCreate.input';
import { UserUpdateInput } from '../models/userUpdate.input';
import { ArticleService } from '../services/article.service';
import { ProfileService } from '../services/profile.service';
import { UserService } from '../services/user.service';

@Resolver(of => User)
export class UserResolver {

  constructor(
    private userService: UserService,
    private articleService: ArticleService,
    private profileService: ProfileService,
  ) {}

  @Query(returns => User, { name: 'user' })
  async getUser(
    @Args('id', { nullable: true }) id?: string,
    @Args('username', { nullable: true }) username?: string,
    @Args('email', { nullable: true }) email?: string,
  ) {

    return this.userService.getUser(id, username, email);
  }

  @Query(returns => User, { name: 'me' })
  async getMe(
    @Context() ctx: ExtendedGqlExecutionContext,
  ) {
    const authHeader = {
      "Authorization": `Bearer ${ctx.token}`,
    };

    return this.userService.getMe(authHeader);
  }

  @Mutation(returns => User)
  async createUser (
    @Args('createUserData') createUserData: UserCreateInput,
  ) {

    return this.userService.create(createUserData);
  }

  @Mutation(returns => User)
  async updateUser (
    @Context() ctx: ExtendedGqlExecutionContext,
    @Args('updateUserData') updateUserData: UserUpdateInput,
  ) {
    const authHeader = {
      "Authorization": `Bearer ${ctx.token}`,
    };

    return this.userService.update(updateUserData, authHeader);
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

}
