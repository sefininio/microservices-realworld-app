import {
  CreateArticleCommentDto,
  CreateArticleDto,
  FindAllArticleQueryDto,
  UpdateArticleDto,
  ArticleDto,
  CommentDto,
} from '@microservices-realworld-example-app/models';
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ArticleService } from './article.service';


@Controller('/articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  /**
   * GET /api/articles
   * Returns most recent articles globally by default, provide tag, author or favorited query parameter to filter results
   * Query Parameters:
   *  Filter by tag: ?tag=AngularJS
   *  Filter by author: ?author=jake
   *  Favorited by user: ?favorited=jake
   *  Limit number of articles (default is 20): ?limit=20
   *  Offset/skip number of articles (default is 0): ?offset=0
   * Authentication optional, will return multiple articles, ordered by most recent first
   */
  @Get()
  listArticles(@Query() query: FindAllArticleQueryDto): Promise<ArticleDto[]> {
    return this.articleService.findAll(query);
  }

  @Get('/:slug')
  getArticle(@Param('slug') slug: string): Promise<ArticleDto | null> {
    return this.articleService.findOne(slug);
  }

  @Post('/')
  createArticle(@Body() body: CreateArticleDto): Promise<ArticleDto | null> {
    return this.articleService.create(body);
  }

  @Put('/:slug')
  updateArticle(@Body() body: UpdateArticleDto, @Param('slug') slug: string): Promise<ArticleDto | null> {
    return this.articleService.update(slug, body);
  }

  @Delete('/:slug')
  deleteArticle(@Param('slug') slug: string): Promise<ArticleDto> {
    return this.articleService.delete(slug);
  }

  @Post('/:slug/comments')
  addComment(@Body() body: CreateArticleCommentDto, @Param('slug') slug: string): Promise<CommentDto | null> {
    return this.articleService.addComment(slug, body);
  }

  @Get('/:slug/comments')
  getComments(@Param('slug') slug: string): Promise<CommentDto[]> {
    return this.articleService.getComments(slug);
  }

  @Delete('/:slug/comments/:id')
  deleteComment(@Param('slug') slug: string, @Param('id') id: string): Promise<CommentDto | null> {
    return this.articleService.deleteComment(id);
  }

}
