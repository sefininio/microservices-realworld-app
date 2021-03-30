import { JwtAuthGuard } from '@microservices-realworld-example-app/auth';
import {
  ArticleDto,
  CommentDto,
  CreateArticleCommentDto,
  CreateArticleDto,
  FavoriteOperation,
  FindAllArticleQueryDto,
  PageDto,
  UpdateArticleDto,
} from '@microservices-realworld-example-app/models';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiHeader, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
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
  @Get('/')
  @ApiOkResponse({
    description: 'The articles list',
    type: [ArticleDto],
  })
  listArticles(@Query() query: FindAllArticleQueryDto): Promise<ArticleDto[]> {
    return this.articleService.findAll(query);
  }

  /**
   * will return multiple articles created by followed users, ordered by most recent first.
   * @param req
   * @param query
   */
  @UseGuards(JwtAuthGuard)
  @Get('/feed')
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT token',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized'
  })
  @ApiOkResponse({
    description: 'The user article feed',
    type: [ArticleDto],
  })
  getUserFeed(@Req() req, @Query() query?: PageDto): Promise<ArticleDto[]> {
    return this.articleService.feed(req.user, query);
  }

  /**
   * Returns article by slug
   *
   * @param slug the slug
   * @returns ArticleDto | null
   */
  @Get('/:slug')
  @ApiOkResponse({
    description: 'The article',
    type: ArticleDto,
  })
  getArticle(@Param('slug') slug: string): Promise<ArticleDto | null> {
    return this.articleService.findOne(slug);
  }

  /**
   * Creates a new article
   *
   * @param body CreteArticleDto
   * @param req the request
   * @returns the created article - ArticleDto | null
   */
  @UseGuards(JwtAuthGuard)
  @Post('/')
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT token',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized'
  })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: ArticleDto,
  })
  createArticle(
    @Body() body: CreateArticleDto,
    @Req() req: any
  ): Promise<ArticleDto | null> {
    return this.articleService.create(body, req.user);
  }

  /**
   * Updates an article
   *
   * @param req the request
   * @param body UpdateArticleDto
   * @param slug the title slug
   * @returns The updated Article - ArticleDto | null
   */
  @UseGuards(JwtAuthGuard)
  @Put('/:slug')
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT token',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized'
  })
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: ArticleDto,
  })
  updateArticle(
    @Req() req: any,
    @Body() body: UpdateArticleDto,
    @Param('slug') slug: string
  ): Promise<ArticleDto | null> {
    return this.articleService.update(slug, body, req.user);
  }

  /**
   * Deletes an article
   *
   * @param slug the title slug
   * @param req the request
   * @returns the deleted article - ArticleDto | null
   */
  @UseGuards(JwtAuthGuard)
  @Delete('/:slug')
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT token',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized'
  })
  @ApiOkResponse({
    description: 'The record has been successfully deleted.',
    type: ArticleDto,
  })
  deleteArticle(
    @Param('slug') slug: string,
    @Req() req: any
  ): Promise<ArticleDto> {
    return this.articleService.delete(slug, req.user);
  }

  /**
   * Creates a comment on an article
   *
   * @param req the request
   * @param body CreateArticleCommentDto
   * @param slug the title slug
   * @returns the created comment - CommentDto | null
   */
  @UseGuards(JwtAuthGuard)
  @Post('/:slug/comments')
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT token',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized'
  })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: ArticleDto,
  })
  addComment(
    @Req() req: any,
    @Body() body: CreateArticleCommentDto,
    @Param('slug') slug: string
  ): Promise<CommentDto | null> {
    return this.articleService.addComment(slug, body, req.user);
  }

  /**
   * Returns all article comments
   *
   * @param slug the title slug
   * @returns the article comments - CommentDto[]
   */
  @Get('/:slug/comments')
  @ApiOkResponse({
    description: 'The comments for the article.',
    type: [CommentDto],
  })
  getComments(@Param('slug') slug: string): Promise<CommentDto[]> {
    return this.articleService.getComments(slug);
  }

  /**
   * Deletes a comment
   *
   * @param req the request
   * @param slug the title slug
   * @param id the comment id
   * @returns the deleted comment - CommentDto | null
   */
  @UseGuards(JwtAuthGuard)
  @Delete('/:slug/comments/:id')
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT token',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized'
  })
  @ApiOkResponse({
    description: 'The record has been successfully deleted.',
    type: CommentDto,
  })
  deleteComment(
    @Req() req: any,
    @Param('slug') slug: string,
    @Param('id') id: string
  ): Promise<CommentDto | null> {
    return this.articleService.deleteComment(id, req.user);
  }

  /**
   * Adds a favorite to an article
   *
   * @param slug the title slug
   * @returns the updated article - ArticleDto | null
   */
  @UseGuards(JwtAuthGuard)
  @Post('/:slug/favorite')
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT token',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized'
  })
  @ApiOkResponse({
    description: 'Add favorite to article.',
    type: ArticleDto,
  })
  addFavorite(@Param('slug') slug: string): Promise<ArticleDto | null> {
    return this.articleService.modifyFavorite(
      slug,
      FavoriteOperation.Increment
    );
  }

  /**
   * Removes a favorite from an article
   *
   * @param slug the title slug
   * @returns the updated article - ArticleDto | null
   */
  @UseGuards(JwtAuthGuard)
  @Delete('/:slug/favorite')
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT token',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized'
  })
  @ApiOkResponse({
    description: 'Remove favorite to article.',
    type: ArticleDto,
  })
  removeFavorite(@Param('slug') slug: string): Promise<ArticleDto | null> {
    return this.articleService.modifyFavorite(
      slug,
      FavoriteOperation.Decrement
    );
  }

}
