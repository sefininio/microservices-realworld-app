import { JwtAuthGuard } from '@microservices-realworld-example-app/auth';
import { FollowOperation, ProfileDto } from '@microservices-realworld-example-app/models';
import { Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('/profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  /**
   * Returns user profile
   *
   */
  @UseGuards(JwtAuthGuard)
  @Get('/:username')
  getProfile(
    @Req() req: any,
    @Param('username') username: string
  ): Promise<ProfileDto | null> {
    // todo: dispatch follow changed
    return this.profileService.findOne(username, req.user);
  }

  /**
   * Adds a follow to a username
   *
   * @param username the username to follow
   * @returns the updated profile ProfileDto
   */
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  @Delete('/:username/follow')
  removeFavorite(
    @Req() req,
    @Param('username') username: string,
  ): Promise<ProfileDto | null> {
    return this.profileService.modifyFollow(username, req.user, FollowOperation.Unfollow);
  }

  @Get('/:username/follows')
  getProfilesFollowedByUser(@Param('username') username: string): Promise<ProfileDto[]> {
    return this.profileService.getProfilesFollowedByUser(username);
  }

}
