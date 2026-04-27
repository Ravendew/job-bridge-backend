import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { JobStatus } from '@prisma/client';
import { CreateJobDto } from './dto/create-job.dto';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto);
  }

  @Get()
  findAll() {
    return this.jobsService.findAll();
  }

  @Get('hot')
  getHotJobs() {
    return this.jobsService.getHotJobs();
  }

  @Get('latest')
  getLatestJobs() {
    return this.jobsService.getLatestJobs();
  }

  @Get('expiring-soon')
  getExpiringSoonJobs() {
    return this.jobsService.getExpiringSoonJobs();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Partial<CreateJobDto>) {
    return this.jobsService.update(id, body);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: JobStatus) {
    return this.jobsService.updateStatus(id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobsService.remove(id);
  }
}
