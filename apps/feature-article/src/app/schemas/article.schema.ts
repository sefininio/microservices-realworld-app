import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Mongoose, Types } from 'mongoose';
import { Comment } from './comment.schema';

export type ArticleDocument = Article & Document;

@Schema()
export class Article {
  @Prop()
  slug: string;

  @Prop({required: true})
  authorId: string;

  @Prop({required: true})
  title: string;

  @Prop({required: true})
  description: string;

  @Prop({required: true})
  body: string;

  @Prop({default: () => new Date()})
  createdAt: Date;

  @Prop({default: () => new Date()})
  updatedAt: Date;

  @Prop({default: null})
  deletedAt: Date;

  @Prop()
  tagList: string[];

  @Prop({default: 0})
  favoritesCount: number;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
