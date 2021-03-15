import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Tag {
  @Field()
  id: string;

  @Field()
  tagName: string;

}
