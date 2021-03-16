import { Field, ObjectType } from '@nestjs/graphql';


@ObjectType()
export class Profile {
  @Field()
  _id: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  image?: string;

  @Field()
  following: boolean;
}
