import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTagDto, TagDto } from '@microservices-realworld-example-app/models';

import { TagService } from './tag.service';

@Controller('/tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  listTags(): Promise<string[]> {
    return this.tagService.findAll();
  }

  @Post()
  create(@Body() body: CreateTagDto): Promise<TagDto | null> {
    return this.tagService.create(body);
  }

}
