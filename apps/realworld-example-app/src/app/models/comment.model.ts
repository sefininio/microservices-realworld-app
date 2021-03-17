import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType()
export class Comment {
  @Field()
  _id: string;

  @Field()
  body: string;

  @Field()
  authorId: string;

  @Field()
  author: User;

  @Field()
  createdAt: string;

  @Field({nullable: true})
  deletedAt: string;

}
