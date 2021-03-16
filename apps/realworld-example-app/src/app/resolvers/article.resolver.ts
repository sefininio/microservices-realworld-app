import { Args, Context, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ExtendedGqlExecutionContext } from '../extended-gql-context';
import { Article } from '../models/article.model';
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

  @ResolveField(returns => User, { name: 'author' })
  async getUser(
    @Context() ctx: ExtendedGqlExecutionContext,
    @Parent() article: Article
  ) {
    const { authorId } = article;
    return this.userService.getUser(authorId);
  }

  @ResolveField(returns => [Comment], { name: 'comments'})
  async getComments(
    @Context() ctx: ExtendedGqlExecutionContext,
    @Parent() article: Article
  ) {
    const { slug } = article;
    return this.articleService.getArticleComments(slug);
  }

}
