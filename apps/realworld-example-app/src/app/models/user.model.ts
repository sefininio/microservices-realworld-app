/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType } from '@nestjs/graphql';
import { Article } from './article.model';

@ObjectType()
export class User {
  @Field()
  _id: string;

  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  image?: string;

  @Field()
  updatedAt: string;

  @Field(type => [Article], { nullable: 'itemsAndList' })
  articles: Article[];

  @Field(type => [Article], { nullable: 'itemsAndList' })
  feed: Article[];

}
