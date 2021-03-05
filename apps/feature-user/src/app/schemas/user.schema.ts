import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({required: true})
  email: string;

  @Prop({required: true})
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
