import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export type ProfileDocument = Profile & Document;

/**
 * The Article mongoose schema
 */
 @Schema()
export class Profile {
  _id: ObjectId;

  @Prop({required: true})
  username: string;

  @Prop()
  bio: string;

  @Prop()
  image: string;

  @Prop({default: []})
  followers: string[];

  following: boolean;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
