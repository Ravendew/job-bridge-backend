import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ mobile: dto.mobile }, { email: dto.email }],
      },
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    return this.prisma.user.create({
      data: dto,
    });
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        mobile: dto.mobile,
        password: dto.password,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async subscribe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const now = new Date();
    const expiry = new Date();
    expiry.setMonth(expiry.getMonth() + 1);

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        isSubscribed: true,
        subscriptionPlan: 'MONTHLY_199',
        subscriptionStartedAt: now,
        subscriptionExpiresAt: expiry,
      },
    });
  }

  async buyAtsService(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        atsServiceBought: true,
        atsServiceBoughtAt: new Date(),
      },
    });
  }
}
