import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop({required: true})
  authorId: string;

  @Prop({required: true})
  articleId: string;

  @Prop({required: true})
  body: string;

  @Prop({default: () => new Date()})
  createdAt: Date;

  @Prop({default: null})
  deletedAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
