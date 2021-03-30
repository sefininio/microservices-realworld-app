import { CreateTagDto, TagDto } from '@microservices-realworld-example-app/models';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { TagService } from './tag.service';


@Controller('/tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  /**
   * Returns all tags
   *
   * @returns string[]
   */
  @Get()
  @ApiOkResponse({
    description: 'Tags list.',
    type: [String],
  })
  listTags(): Promise<string[]> {
    return this.tagService.findAll();
  }

  /**
   * Creates a tag
   *
   * @param body CreateTagDto
   * @returns TagDto | null
   */
  @Post()
  @ApiOkResponse({
    description: 'Create tag.',
    type: TagDto,
  })
  create(@Body() body: CreateTagDto): Promise<TagDto | null> {
    return this.tagService.create(body);
  }

}
