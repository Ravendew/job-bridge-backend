import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateApplicationDto } from './dto/create-application.dto';

@Injectable()
export class ApplicationsService {
  constructor(private prisma: PrismaService) {}

  async create(createApplicationDto: CreateApplicationDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: createApplicationDto.userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.isSubscribed) {
      throw new UnauthorizedException('Subscription required to apply');
    }

    if (user.subscriptionExpiresAt && new Date() > user.subscriptionExpiresAt) {
      throw new UnauthorizedException('Subscription expired');
    }

    const job = await this.prisma.job.findUnique({
      where: { id: createApplicationDto.jobId },
    });

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    const existingApplication = await this.prisma.application.findUnique({
      where: {
        userId_jobId: {
          userId: createApplicationDto.userId,
          jobId: createApplicationDto.jobId,
        },
      },
    });

    if (existingApplication) {
      throw new ConflictException('You already applied for this job');
    }

    return this.prisma.application.create({
      data: createApplicationDto,
      include: {
        user: true,
        job: true,
      },
    });
  }

  async findAll() {
    return this.prisma.application.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true,
        job: true,
      },
    });
  }
}
