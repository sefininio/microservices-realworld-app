import { JwtAuthGuard } from '@microservices-realworld-example-app/auth';
import {
  ArticleDto,
  CommentDto, CreateArticleCommentDto,
  CreateArticleDto,
  FindAllArticleQueryDto,
  UpdateArticleDto
} from '@microservices-realworld-example-app/models';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service';
import { FavoriteOperation } from './enums/favorite.enum';


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

  @UseGuards(JwtAuthGuard)
  @Post('/')
  createArticle(@Body() body: CreateArticleDto, @Req() req: any): Promise<ArticleDto | null> {
    return this.articleService.create(body, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:slug')
  updateArticle(
    @Req() req: any,
    @Body() body: UpdateArticleDto,
    @Param('slug') slug: string
  ): Promise<ArticleDto | null> {
    return this.articleService.update(slug, body, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:slug')
  deleteArticle(@Param('slug') slug: string, @Req() req: any): Promise<ArticleDto> {
    return this.articleService.delete(slug, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:slug/comments')
  addComment(
    @Req() req: any,
    @Body() body: CreateArticleCommentDto,
    @Param('slug') slug: string
  ): Promise<CommentDto | null> {
    return this.articleService.addComment(slug, body, req.user);
  }

  @Get('/:slug/comments')
  getComments(@Param('slug') slug: string): Promise<CommentDto[]> {
    return this.articleService.getComments(slug);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:slug/comments/:id')
  deleteComment(
    @Req() req: any,
    @Param('slug') slug: string,
    @Param('id') id: string
  ): Promise<CommentDto | null> {
    return this.articleService.deleteComment(id, req.user);
  }

  @Post('/:slug/favorite')
  addFavorite(@Param('slug') slug: string): Promise<ArticleDto | null> {
    return this.articleService.modifyFavorite(slug, FavoriteOperation.Increment);
  }

  @Delete('/:slug/favorite')
  removeFavorite(@Param('slug') slug: string): Promise<ArticleDto | null> {
    return this.articleService.modifyFavorite(slug, FavoriteOperation.Decrement);
  }

}
