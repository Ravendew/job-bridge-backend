import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MasterDataService {
  constructor(private prisma: PrismaService) {}

  // ---------- BANNERS ----------
  getBanners() {
    return this.prisma.banner.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  createBanner(data: any) {
    return this.prisma.banner.create({ data });
  }

  deleteBanner(id: string) {
    return this.prisma.banner.delete({ where: { id } });
  }

  // ---------- CATEGORIES ----------
  getCategories() {
    return this.prisma.category.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  createCategory(data: any) {
    return this.prisma.category.create({ data });
  }

  deleteCategory(id: string) {
    return this.prisma.category.delete({ where: { id } });
  }

  // ---------- COUNTRIES ----------
  getCountries() {
    return this.prisma.country.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  createCountry(data: any) {
    return this.prisma.country.create({ data });
  }

  deleteCountry(id: string) {
    return this.prisma.country.delete({ where: { id } });
  }
}
