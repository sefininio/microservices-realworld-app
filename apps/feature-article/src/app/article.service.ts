import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import {
  CreateArticleCommentDto,
  CreateArticleDto,
  FindAllArticleQueryDto,
  UpdateArticleDto,
  ArticleDto,
  CommentDto,
  UserDto,
} from '@microservices-realworld-example-app/models';
import { StringUtilsService, PromisifyHttpService } from '@microservices-realworld-example-app/shared';

import { Model } from 'mongoose';
import { Article, ArticleDocument } from './schemas/article.schema';
import { Comment, CommentDocument } from './schemas/comment.schema';

@Injectable()
export class ArticleService {

  userFeatureBaseUrl: string;

  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private promisifyHttp: PromisifyHttpService,
    private stringUtils: StringUtilsService,
    private configService: ConfigService,
  ) {
    this.userFeatureBaseUrl = this.configService.get<string>('features.user.baseUrl');
  }

  async findAll(queryParams: FindAllArticleQueryDto): Promise<ArticleDto[]> {
    const query: any = {};
    if (queryParams.tag) {
      query.tagList = queryParams.tag;
    }
    if (queryParams.author) {
      const author: UserDto = await this.promisifyHttp.get(`${this.userFeatureBaseUrl}/user/username/${queryParams.author}`);
      query.authorId = author._id;
    }
    const limit = parseInt(queryParams.limit) || 20;
    const offset = parseInt(queryParams.offset) || 0;

    return await this.articleModel.find(query).skip(offset).limit(limit).exec();
  }

  async findOne(slug: string): Promise<ArticleDto | null> {
    return await this.articleModel.findOne({slug}).exec();
  }

  async create(body: CreateArticleDto): Promise<ArticleDto | null> {
    const article = {
      ...body,
      slug: this.stringUtils.slugify(body.title),
    }
    return await this.articleModel.create(article);
  }

  async update(slug: string, body: UpdateArticleDto): Promise<ArticleDto | null> {
    const update = {
      ...body,
      slug: this.stringUtils.slugify(body.title),
      updatedAt: new Date(),
    };
    return await this.articleModel.findOneAndUpdate({slug}, update, {new: true, useFindAndModify: false});
  }

  async delete(slug: string): Promise<ArticleDto> {
    const update = {
      deletedAt: new Date(),
    };
    return await this.articleModel.findOneAndUpdate({slug}, update, {new: true, useFindAndModify: false});
  }

  async addComment(slug: string, body: CreateArticleCommentDto): Promise<CommentDto | null> {
    const { _id: articleId } = await this.articleModel.findOne({slug}).exec();
    const comment = {
      ...body,
      articleId,
    };
    return await this.commentModel.create(comment);
  }

  async getComments(slug: string): Promise<CommentDto[]> {
    const { _id: articleId } = await this.articleModel.findOne({slug}).exec();
    return await this.commentModel.find({articleId}).exec();
  }

  async deleteComment(id: string): Promise<CommentDto | null> {
    const update = {
      deletedAt: new Date(),
    };
    return await this.commentModel.findOneAndUpdate({_id: id}, update, {new: true, useFindAndModify: false});
  }

}
