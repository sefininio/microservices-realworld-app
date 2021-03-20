/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ArticleCreateInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  body: string;

  @Field(type => [String], {nullable: true})
  tagList: string[];

}
