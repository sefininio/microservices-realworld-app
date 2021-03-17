import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserCreateInput {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;

}
