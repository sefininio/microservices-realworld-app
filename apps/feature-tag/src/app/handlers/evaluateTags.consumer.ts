import { QueueEvents, Queues } from '@microservices-realworld-example-app/models';
import { Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job } from 'bull';
import { difference } from 'lodash';
import { TagService } from '../tag.service';

/**
 * This class handles EvaluateTags messages on the Tags queue.
 */
@Processor(Queues.Tags)
@Injectable()
export class EvaluateTagsConsumer {

  constructor(
    private readonly tagService: TagService,
  ) {}

  @Process(QueueEvents.EvaluateTags)
  async evaluateTags(job: Job) {
    const { tagList } = job.data;

    const tags = await this.tagService.findAll();
    const delta = difference(tagList, tags);

    return await this.tagService.batchCreate(delta.map(item => ({tagName: item})));
  }

}
