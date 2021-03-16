import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Article {
  @Field()
  _id: string;

  @Field()
  slug: string;

  @Field()
  authorId: string;

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

  // @Field(type => [Comment])
  // comments: Comment[];

}
