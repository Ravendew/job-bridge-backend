import { Injectable } from '@nestjs/common';
import { JobStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJobDto } from './dto/create-job.dto';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  async create(createJobDto: CreateJobDto & { status?: JobStatus }) {
    return this.prisma.job.create({
      data: {
        ...createJobDto,
        status: createJobDto.status || JobStatus.ACTIVE,
      },
    });
  }

  async findAll() {
    return this.prisma.job.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getHotJobs() {
    return this.prisma.job.findMany({
      where: {
        isHot: true,
        status: JobStatus.ACTIVE,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getLatestJobs() {
    return this.prisma.job.findMany({
      where: {
        status: JobStatus.ACTIVE,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
    });
  }

  async getExpiringSoonJobs() {
    const now = new Date();

    const next7Days = new Date();
    next7Days.setDate(now.getDate() + 7);

    return this.prisma.job.findMany({
      where: {
        status: JobStatus.ACTIVE,
        expiryDate: {
          gte: now,
          lte: next7Days,
        },
      },
      orderBy: {
        expiryDate: 'asc',
      },
    });
  }

  async update(
    id: string,
    updateJobDto: Partial<CreateJobDto> & { status?: JobStatus },
  ) {
    return this.prisma.job.update({
      where: { id },
      data: updateJobDto,
    });
  }

  async updateStatus(id: string, status: JobStatus) {
    return this.prisma.job.update({
      where: { id },
      data: { status },
    });
  }

  async remove(id: string) {
    return this.prisma.job.delete({
      where: { id },
    });
  }
}
