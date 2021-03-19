import { QueueEvents, Queues, UserDto } from '@microservices-realworld-example-app/models';
import { Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job } from 'bull';
import { ProfileService } from '../profile.service';

/**
 * This class handles EvaluateTags messages on the Tags queue.
 */
@Processor(Queues.Users)
@Injectable()
export class UserConsumer {

  constructor(
    private readonly profileService: ProfileService,
  ) {}

  @Process(QueueEvents.UserUpdated)
  async handleUserUpdated(job: Job) {
    const user: UserDto = job.data;
    return await this.profileService.upsert(user);
  }

}
