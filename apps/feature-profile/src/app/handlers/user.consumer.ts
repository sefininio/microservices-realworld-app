import { QueueEvents, Queues, UserDto } from '@microservices-realworld-example-app/models';
import { Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job } from 'bull';
import { ProfileService } from '../profile.service';
import { Profile } from '../schemas/profile.schema';

/**
 * This class handles EvaluateTags messages on the Tags queue.
 */
@Processor(Queues.Users)
@Injectable()
export class UserConsumer {

  constructor(
    private readonly profileService: ProfileService,
  ) {}

  @Process(QueueEvents.UserCreated)
  async handleUserCreated(job: Job) {
    const user = job.data;
    const create = {
      username: user.username,
      bio: user.bio,
      image: user.image,
      followers: [],
    }

    return await this.profileService.create(create);
  }

  @Process(QueueEvents.UserUpdated)
  async handleUserUpdated(job: Job) {
    const user: UserDto = job.data;
    const profile: Profile = await this.profileService.findOneProfile(user.username);
    const update = {
      username: profile.username,
      bio: user.bio,
      image: user.image,
      followers: profile.followers,
    };

    return await this.profileService.update(update);
  }

}
