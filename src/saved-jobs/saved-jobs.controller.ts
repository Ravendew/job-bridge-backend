import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ToggleSavedJobDto } from './dto/toggle-saved-job.dto';
import { SavedJobsService } from './saved-jobs.service';

@Controller('saved-jobs')
export class SavedJobsController {
  constructor(private readonly savedJobsService: SavedJobsService) {}

  @Post('toggle')
  toggle(@Body() dto: ToggleSavedJobDto) {
    return this.savedJobsService.toggle(dto);
  }

  @Get('user/:userId')
  getUserSavedJobs(@Param('userId') userId: string) {
    return this.savedJobsService.getUserSavedJobs(userId);
  }
}
