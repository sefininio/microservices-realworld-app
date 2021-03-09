import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticleDocument = Article & Document;

/**
 * The Article mongoose schema
 */
 @Schema()
export class Article {
  _id: string;

  @Prop({unique: true})
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
