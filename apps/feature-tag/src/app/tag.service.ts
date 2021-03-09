import { CreateTagDto, TagDto } from '@microservices-realworld-example-app/models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tag, TagDocument } from './schemas/tag.schema';

@Injectable()
export class TagService {

  constructor(
    @InjectModel(Tag.name) private tagModel:Model<TagDocument>,
  ){}

  async findAll(): Promise<string[]> {
    const tags = await this.tagModel.find().exec();
    return tags.map(tag => tag.tagName);
  }

  async create(body: CreateTagDto): Promise<TagDto | null> {
    return await this.tagModel.create(body);
  }

  async batchCreate(items: CreateTagDto[]): Promise<any> {
    const toCreateItems = items.map(item => ({
      insertOne: {
        document: item,
      },
    }));

    return await this.tagModel.bulkWrite(toCreateItems);
  }

}
