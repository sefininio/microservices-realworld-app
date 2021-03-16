import { ArticleDto } from '@microservices-realworld-example-app/models';
import { PromisifyHttpService } from '@microservices-realworld-example-app/shared';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ArticleService {

  articleFeatureBaseUrl: string;

  constructor(
    private configService: ConfigService,
    private promisifyHttp: PromisifyHttpService,
  ) {
    this.articleFeatureBaseUrl = this.configService.get<string>('features.article.baseUrl');
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

}
