import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserUpdateInput {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field({nullable: true})
  password: string;

  @Field({nullable: true})
  bio: string;

  @Field({nullable: true})
  image: string;

}
