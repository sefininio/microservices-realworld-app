import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Comment {
  @Field()
  body: string;
}
