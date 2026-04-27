import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateSuccessStoryDto } from './dto/create-success-story.dto';
import { SuccessStoriesService } from './success-stories.service';

@Controller('success-stories')
export class SuccessStoriesController {
  constructor(private readonly successStoriesService: SuccessStoriesService) {}

  @Post()
  create(@Body() dto: CreateSuccessStoryDto) {
    return this.successStoriesService.create(dto);
  }

  @Get()
  findAll() {
    return this.successStoriesService.findAll();
  }
}
