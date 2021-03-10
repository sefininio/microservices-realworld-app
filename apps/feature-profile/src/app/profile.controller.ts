import { FollowOperation, ProfileDto } from '@microservices-realworld-example-app/models';
import { Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('/profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  /**
   * Returns user profile
   *
   */
  @Get('/:username')
  getArticle(
    @Req() req: any,
    @Param('username') username: string
  ): Promise<ProfileDto | null> {
    return this.profileService.findOne(username, req.user);
  }

  /**
   * Adds a follow to a username
   *
   * @param username the username to follow
   * @returns the updated profile ProfileDto
   */
  @Post('/:username/follow')
  addFavorite(
    @Req() req,
    @Param('username') username: string,
  ): Promise<ProfileDto | null> {
    return this.profileService.modifyFollow(username, req.user, FollowOperation.Follow);
  }

  /**
   * Removes a follow from a username
   *
   * @param username the username to unfollow
   * @returns the updated profile ProfileDto
   */
  @Delete('/:username/follow')
  removeFavorite(
    @Req() req,
    @Param('username') username: string,
  ): Promise<ProfileDto | null> {
    return this.profileService.modifyFollow(username, req.user, FollowOperation.Unfollow);
  }
}
