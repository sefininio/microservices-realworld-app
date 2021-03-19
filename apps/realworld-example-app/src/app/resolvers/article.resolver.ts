/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ExtendedGqlExecutionContext } from '../extended-gql-context';
import { Article } from '../models/article.model';
import { ArticleCreateInput } from '../models/articleCreate.input';
import { ArticleUpdateInput } from '../models/articleUpdate.input';
import { Comment } from '../models/comment.model';
import { User } from '../models/user.model';
import { ArticleService } from '../services/article.service';
import { UserService } from '../services/user.service';


@Resolver(of => Article)
export class ArticleResolver {

  constructor(
    private articleService: ArticleService,
    private userService: UserService,
  ) {}

  @Query(returns => [Article], { name: 'articles', nullable: 'items' })
  async getArticles(
    @Args('slug', { nullable: true }) slug?: string,
  ) {

    if (slug) {
      return this.articleService.getArticle(slug);
    } else {
      return this.articleService.getAllArticles();
    }
  }

  @Mutation(returns => Article)
  async createArticle(
    @Context() ctx: ExtendedGqlExecutionContext,
    @Args('createArticleData') createArticleData: ArticleCreateInput,
  ) {
    const authHeader = {
      "Authorization": `Bearer ${ctx.token}`,
    };

    return this.articleService.create(createArticleData, authHeader);
  }

  @Mutation(returns => Article)
  async updateArticle(
    @Context() ctx: ExtendedGqlExecutionContext,
    @Args('updateArticleData') updateArticleData: ArticleUpdateInput,
  ) {
    const authHeader = {
      "Authorization": `Bearer ${ctx.token}`,
    };

    return this.articleService.update(updateArticleData, authHeader);
  }

  @Mutation(returns => Article)
  async deleteArticle(
    @Context() ctx: ExtendedGqlExecutionContext,
    @Args('slug') slug: string,
  ) {
    const authHeader = {
      "Authorization": `Bearer ${ctx.token}`,
    };

    return this.articleService.delete(slug, authHeader);
  }

  @Mutation(returns => Article)
  async addFavorite(
    @Context() ctx: ExtendedGqlExecutionContext,
    @Args('slug') slug: string,
  ) {
    const authHeader = {
      "Authorization": `Bearer ${ctx.token}`,
    };

    return this.articleService.addFavorite(slug, authHeader);
  }

  @Mutation(returns => Article)
  async removeFavorite(
    @Context() ctx: ExtendedGqlExecutionContext,
    @Args('slug') slug: string,
  ) {
    const authHeader = {
      "Authorization": `Bearer ${ctx.token}`,
    };

    return this.articleService.removeFavorite(slug, authHeader);
  }

  @ResolveField(returns => User, { name: 'author' })
  async getUser(
    @Parent() article: Article
  ) {
    const { authorId } = article;
    return this.userService.getUser(authorId);
  }

  @ResolveField(returns => [Comment], { name: 'comments'})
  async getComments(
    @Parent() article: Article
  ) {
    const { slug } = article;
    return this.articleService.getArticleComments(slug);
  }

}
