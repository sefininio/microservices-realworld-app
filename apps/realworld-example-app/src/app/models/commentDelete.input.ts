import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CommentDeleteInput {
  @Field()
  slug: string;

  @Field()
  id: string;

}
