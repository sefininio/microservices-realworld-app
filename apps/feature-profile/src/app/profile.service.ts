import { FollowOperation, ProfileDto, UserDto } from '@microservices-realworld-example-app/models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { pull, uniq } from 'lodash';
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
      _id: profile._id,
      username: profile.username,
      bio: profile.bio,
      image: profile.image,
      following,
    };
  }

  async findOneProfile(username: string): Promise<Profile | null> {
    return await this.profileModel.findOne({username}).exec();
  }

  async upsert(user: UserDto): Promise<ProfileDto | null> {
    const update = {
      followers: [],
      username: user.username,
      bio: user.bio,
      image: user.image,
    }
    return await this.profileModel.findOneAndUpdate(
      {username: user.username},
      update,
      {new: true, useFindAndModify: false, upsert: true}
    );
  }

  async modifyFollow(username: string, user: UserDto, op: FollowOperation): Promise<ProfileDto | null> {
    const profile: Profile = await this.profileModel.findOne({username}).exec();

    const update = {
      followers: profile.followers,
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

    const updated = await this.profileModel.findOneAndUpdate({username}, update, {new: true, useFindAndModify: false});
    const following: boolean = updated.followers.includes(user.username);

    return {
      _id: updated._id,
      username: updated.username,
      bio: updated.bio,
      image: updated.image,
      following,
    };

  }

  async getProfilesFollowedByUser(username: string): Promise<ProfileDto[]> {
    return await this.profileModel.find({followers: username}).exec();
  }

}
