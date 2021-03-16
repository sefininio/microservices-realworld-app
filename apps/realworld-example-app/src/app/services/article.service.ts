import { ArticleDto } from '@microservices-realworld-example-app/models';
import { PromisifyHttpService } from '@microservices-realworld-example-app/shared';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Comment } from '../models/comment.model';

@Injectable()
export class ArticleService {

  articleFeatureBaseUrl: string;
  userFeatureBaseUrl: string;

  constructor(
    private configService: ConfigService,
    private promisifyHttp: PromisifyHttpService,
  ) {
    this.articleFeatureBaseUrl = this.configService.get<string>('features.article.baseUrl');
    this.userFeatureBaseUrl = this.configService.get<string>('features.user.baseUrl');
  }

  async getArticle(slug: string): Promise<ArticleDto[]> {
    const url = `${this.articleFeatureBaseUrl}/articles/${slug}`;
    const article: ArticleDto = await this.promisifyHttp.get(url);
    return [article];
  }

  async getAllArticles(): Promise<ArticleDto[]> {
    const url = `${this.articleFeatureBaseUrl}/articles`;
    return this.promisifyHttp.get(url);
  }

  async getUserArticles(username: string): Promise<ArticleDto[]> {
    const url = `${this.articleFeatureBaseUrl}/articles?author=${username}`;
    return this.promisifyHttp.get(url);
  }

  async getUserFeed(authHeader: any): Promise<ArticleDto[]> {
    const url = `${this.articleFeatureBaseUrl}/articles/feed`;
    return this.promisifyHttp.get(url, {headers: authHeader});
  }

  async getArticleComments(slug: string): Promise<Comment[]> {
    const url = `${this.articleFeatureBaseUrl}/articles/${slug}/comments`;
    const comments = await this.promisifyHttp.get(url);
    const authorIds: string = comments.reduce((acc, comment) => {
      acc.push(comment.authorId);
      return acc;
    }, []).join(',');
    const users = await this.promisifyHttp.get(`${this.userFeatureBaseUrl}/user/users/ids/${authorIds}`);

    const populatedComments = comments.map(comment => {
      comment.author = users[comment.authorId];
      return comment;
    });

    return populatedComments;

  }

}
