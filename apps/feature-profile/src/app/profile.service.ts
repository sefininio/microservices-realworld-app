import { CreateProfileDto, FollowOperation, ProfileDto, UpdateProfileDto, UserDto } from '@microservices-realworld-example-app/models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { uniq, pull } from 'lodash';
import { Model } from 'mongoose';
import { Profile, ProfileDocument } from './schemas/profile.schema';

@Injectable()
export class ProfileService {

  constructor (
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
  ) {}

  /**
   * Returns the profile related to the username, and also if the current
   * user is following the username
   *
   * @param username the username related to the requested profile
   * @param user the current user
   * @returns ProfileDto
   */
  async findOne(username: string, user: UserDto): Promise<ProfileDto | null> {
    const profile: Profile = await this.profileModel.findOne({username}).exec();

    const following: boolean = profile.followers.includes(user.username);

    return {
      ...profile,
      following,
    };
  }

  async findOneProfile(username: string): Promise<Profile | null> {
    return await this.profileModel.findOne({username}).exec();
  }

  async create(profile: CreateProfileDto): Promise<ProfileDto | null> {
    return await this.profileModel.create(profile);
  }

  async update(profile: UpdateProfileDto): Promise<ProfileDto | null> {
    return await this.profileModel.findOneAndUpdate(
      {username: profile.username},
      profile,
      {new: true, useFindAndModify: false}
    );
  }

  async modifyFollow(username: string, user: UserDto, op: FollowOperation): Promise<ProfileDto | null> {
    const profile: Profile = await this.profileModel.findOne({username}).exec();

    const update = {
      ...profile,
    }
    switch (op) {
      case FollowOperation.Follow:
        update.followers.push(user.username);
        update.followers = uniq(update.followers);
        break;
      case FollowOperation.Unfollow:
        update.followers = pull(update.followers, user.username);
        break;
    }

    return await this.profileModel.findOneAndUpdate({username}, update, {new: true, useFindAndModify: false});
  }


}
