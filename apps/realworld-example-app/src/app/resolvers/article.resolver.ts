// import { HttpService } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { Query } from '@nestjs/graphql';
// import { Resolver } from 'node:dns';
// import { Article } from '../models/article.model';


// @Resolver(of => Article)
// export class ArticleResolver {

//   articleFeatureBaseUrl: string;

//   constructor(
//     private configService: ConfigService,
//     private httpService: HttpService,
//   ) {
//     this.articleFeatureBaseUrl = this.configService.get<string>('features.article.baseUrl');
//   }

//   @Query(returns => [Article], { name: 'articles' })
//   async getArticles() {

//   }

// }
