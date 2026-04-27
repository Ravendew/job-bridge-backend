import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ToggleSavedJobDto } from './dto/toggle-saved-job.dto';

@Injectable()
export class SavedJobsService {
  constructor(private prisma: PrismaService) {}

  async toggle(dto: ToggleSavedJobDto) {
    const existing = await this.prisma.savedJob.findUnique({
      where: {
        userId_jobId: {
          userId: dto.userId,
          jobId: dto.jobId,
        },
      },
    });

    if (existing) {
      await this.prisma.savedJob.delete({
        where: {
          userId_jobId: {
            userId: dto.userId,
            jobId: dto.jobId,
          },
        },
      });

      return { message: 'Removed from saved jobs' };
    }

    await this.prisma.savedJob.create({
      data: dto,
    });

    return { message: 'Saved job added' };
  }

  async getUserSavedJobs(userId: string) {
    return this.prisma.savedJob.findMany({
      where: { userId },
      include: {
        job: true,
      },
    });
  }
}
