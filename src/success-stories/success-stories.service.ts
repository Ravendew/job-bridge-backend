import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSuccessStoryDto } from './dto/create-success-story.dto';

@Injectable()
export class SuccessStoriesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateSuccessStoryDto) {
    return this.prisma.successStory.create({
      data: dto,
    });
  }

  async findAll() {
    return this.prisma.successStory.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
