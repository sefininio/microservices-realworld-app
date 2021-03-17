import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CommentCreateInput {
  @Field()
  slug: string;

  @Field()
  body: string;

}
