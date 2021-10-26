import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export type TagDocument = Tag & Document;

/**
 * The Tag mongoose schema
 */
 @Schema()
export class Tag {
  _id: ObjectId;

  @Prop({required: true, unique: true})
  tagName: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
