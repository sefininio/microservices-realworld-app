/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ArticleUpdateInput {
  @Field()
  slug: string;

  @Field({ nullable: true})
  title: string;

  @Field({ nullable: true})
  description: string;

  @Field({ nullable: true})
  body: string;

  @Field(type => [String], {nullable: true})
  tagList: string[];

}
