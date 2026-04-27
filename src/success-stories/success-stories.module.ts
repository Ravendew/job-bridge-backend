import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SuccessStoriesController } from './success-stories.controller';
import { SuccessStoriesService } from './success-stories.service';

@Module({
  imports: [PrismaModule],
  controllers: [SuccessStoriesController],
  providers: [SuccessStoriesService],
})
export class SuccessStoriesModule {}
