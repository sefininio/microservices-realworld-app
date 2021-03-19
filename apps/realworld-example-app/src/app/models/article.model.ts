/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Comment } from './comment.model';
import { User } from './user.model';

@ObjectType()
export class Article {
  @Field()
  _id: string;

  @Field()
  slug: string;

  @Field()
  authorId: string;

  @Field()
  author: User;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  body: string;

  @Field(type => [String], { nullable: 'items' })
  tagList: string[];

  @Field(type => Int)
  favoritesCount: number;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;

  @Field({nullable: true})
  deletedAt: string;

  @Field(type => [Comment], { nullable: 'items' })
  comments: Comment[];

}
