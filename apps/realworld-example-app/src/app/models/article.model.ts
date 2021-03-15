import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Comment } from './comment.model';
import { Tag } from './tag.model';

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

  @Field(type => [Tag], { nullable: 'items' })
  tagList: Tag[];

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
