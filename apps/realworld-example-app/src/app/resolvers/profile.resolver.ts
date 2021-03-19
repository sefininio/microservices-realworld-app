/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ExtendedGqlExecutionContext } from '../extended-gql-context';
import { Profile } from '../models/profile.model';
import { ProfileService } from '../services/profile.service';


@Resolver(of => Profile)
export class ProfileResolver {

  constructor(
    private profileService: ProfileService,
  ) {}

  @Query(returns => Profile, { name: 'profile' })
  async getProfile(
    @Context() ctx: ExtendedGqlExecutionContext,
    @Args('username') username: string,
  ) {
    const authHeader = {
      "Authorization": `Bearer ${ctx.token}`,
    };

    return this.profileService.getProfile(username, authHeader);
  }

  @Mutation(returns => Profile)
  async addFollow(
    @Context() ctx: ExtendedGqlExecutionContext,
    @Args('username') username: string,
  ) {
    const authHeader = {
      "Authorization": `Bearer ${ctx.token}`,
    };

    return this.profileService.addFollow(username, authHeader);
  }

  @Mutation(returns => Profile)
  async removeFollow(
    @Context() ctx: ExtendedGqlExecutionContext,
    @Args('username') username: string,
  ) {
    const authHeader = {
      "Authorization": `Bearer ${ctx.token}`,
    };

    return this.profileService.removeFollow(username, authHeader);
  }

}
