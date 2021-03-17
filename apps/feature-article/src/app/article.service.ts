import {
  ArticleDto,
  CommentDto, CreateArticleCommentDto,
  CreateArticleDto,
  FavoriteOperation,
  FindAllArticleQueryDto,
  PageDto,
  ProfileDto,
  QueueEvents,
  Queues,
  UpdateArticleDto,
  UserDto
} from '@microservices-realworld-example-app/models';
import { PromisifyHttpService, StringUtilsService } from '@microservices-realworld-example-app/shared';
import { InjectQueue } from '@nestjs/bull';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Queue } from 'bull';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from './schemas/article.schema';
import { Comment, CommentDocument } from './schemas/comment.schema';


@Injectable()
export class ArticleService {

  userFeatureBaseUrl: string;
  profileFeatureBaseUrl: string;

  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectQueue(Queues.Tags) private tagsQueue: Queue,
    private promisifyHttp: PromisifyHttpService,
    private stringUtils: StringUtilsService,
    private configService: ConfigService,
  ) {
    this.userFeatureBaseUrl = this.configService.get<string>('features.user.baseUrl');
    this.profileFeatureBaseUrl = this.configService.get<string>('features.profile.baseUrl');
  }

  async isUserArticleAuthor(user: UserDto, slug: string) {
    const article: ArticleDto = await this.articleModel.findOne({slug}).exec();

    // only original author can update
    if (!article || article.authorId !== user._id) {
      throw new UnauthorizedException();
    }
  }

  async isUserCommentAuthor(user: UserDto, id: string) {
    const comment: CommentDto = await this.commentModel.findOne({_id: id}).exec();

    // only original author can update
    if (!comment || comment.authorId !== user._id) {
      throw new UnauthorizedException();
    }
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

  async feed(user: UserDto, queryParams?: PageDto): Promise<ArticleDto[]> {
    // find all users this user is following
    const profiles: ProfileDto[] = await this.promisifyHttp.get(`${this.profileFeatureBaseUrl}/profiles/${user.username}/follows`);
    const usernames = profiles.map(profile => profile.username);

    // find the respective users
    const users: UserDto[] = await this.promisifyHttp.get(`${this.userFeatureBaseUrl}/user/users/${usernames}`);
    const query = users.map(item => item._id);
    const limit = queryParams?.limit && parseInt(queryParams.limit) || 20;
    const offset = queryParams?.offset && parseInt(queryParams.offset) || 0;

    // find articles these users authored
    const articles = await this.articleModel.find({
      authorId: { $in: query }
    }).sort({createdAt: -1}).skip(offset).limit(limit).exec();
    return articles;
  }

  async findOne(slug: string): Promise<ArticleDto | null> {
    return await this.articleModel.findOne({slug}).exec();
  }

  async create(body: CreateArticleDto, user: UserDto): Promise<ArticleDto | null> {
    const { tagList } = body;

    if (tagList && tagList.length) {
      // publish the tagList in a EvaluateTag message on the Tags queue
      await this.tagsQueue.add(QueueEvents.EvaluateTags, {
        tagList,
      });
    }

    // save the new article
    const article = {
      ...body,
      authorId: user._id,
      slug: this.stringUtils.slugify(body.title),
    }
    return await this.articleModel.create(article);
  }

  async update(slug: string, body: UpdateArticleDto, user: UserDto): Promise<ArticleDto | null> {
    const { tagList } = body;

    if (tagList && tagList.length) {
      // publish the tagList in a EvaluateTag message on the Tags queue
      await this.tagsQueue.add(QueueEvents.EvaluateTags, {
        tagList,
      });
    }

    // only original author is allowed to update
    await this.isUserArticleAuthor(user, slug);

    // save the updated article
    const update = {
      ...body,
      slug: this.stringUtils.slugify(body.title),
      updatedAt: new Date(),
    };

    return await this.articleModel.findOneAndUpdate({slug}, update, {new: true, useFindAndModify: false});
  }

  async delete(slug: string, user: UserDto): Promise<ArticleDto> {
    await this.isUserArticleAuthor(user, slug);

    const update = {
      deletedAt: new Date(),
    };
    const deleted = await this.articleModel.findOneAndUpdate({slug}, update, {new: true, useFindAndModify: false});
    // delete all article comments
    await this.deleteArticleComments(deleted);

    return deleted;
  }

  async addComment(slug: string, body: CreateArticleCommentDto, user: UserDto): Promise<CommentDto | null> {
    const { _id: articleId } = await this.articleModel.findOne({slug}).exec();
    const comment = {
      ...body,
      authorId: user._id,
      articleId,
    };
    return await this.commentModel.create(comment);
  }

  async getComments(slug: string): Promise<CommentDto[]> {
    const { _id: articleId } = await this.articleModel.findOne({slug}).exec();
    return await this.commentModel.find({articleId, deletedAt: { $eq: null }}).exec();
  }

  async deleteComment(id: string, user: UserDto): Promise<CommentDto | null> {
    await this.isUserCommentAuthor(user, id);

    const update = {
      deletedAt: new Date(),
    };
    return await this.commentModel.findOneAndUpdate({_id: id}, update, {new: true, useFindAndModify: false});
  }

  async deleteArticleComments(article: ArticleDto): Promise<any> {
    const update = {
      deletedAt: article.deletedAt
    };
    return this.commentModel.updateMany({articleId: article._id}, update);
  }

  async modifyFavorite(slug: string, op: FavoriteOperation): Promise<ArticleDto | null> {
    const article: Article = await this.articleModel.findOne({slug}).exec();
    if (article.favoritesCount === 0 && op === FavoriteOperation.Decrement) {
      return article;
    }

    const update = {
      $inc: { favoritesCount: op === FavoriteOperation.Increment ? 1 : -1 },
      updatedAt: new Date(),
    };

    return await this.articleModel.findOneAndUpdate({slug}, update, {new: true, useFindAndModify: false});
  }

}
