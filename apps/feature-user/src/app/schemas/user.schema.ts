import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

/**
 * The User mongoose schema
 */
@Schema()
export class User {
  _id: string;

  @Prop({required: true, unique: true})
  email: string;

  @Prop({required: true, unique: true})
  username: string;

  @Prop({required: true})
  password: string;

  @Prop()
  bio: string;

  @Prop()
  image: string;

  @Prop({default: () => new Date()})
  createdAt: Date;

  @Prop({default: () => new Date()})
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
