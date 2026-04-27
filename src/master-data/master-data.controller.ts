import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { MasterDataService } from './master-data.service';

@Controller('master-data')
export class MasterDataController {
  constructor(private readonly masterDataService: MasterDataService) {}

  // ---------- BANNERS ----------
  @Get('banners')
  getBanners() {
    return this.masterDataService.getBanners();
  }

  @Post('banners')
  createBanner(@Body() body: any) {
    return this.masterDataService.createBanner(body);
  }

  @Delete('banners/:id')
  deleteBanner(@Param('id') id: string) {
    return this.masterDataService.deleteBanner(id);
  }

  // ---------- CATEGORIES ----------
  @Get('categories')
  getCategories() {
    return this.masterDataService.getCategories();
  }

  @Post('categories')
  createCategory(@Body() body: any) {
    return this.masterDataService.createCategory(body);
  }

  @Delete('categories/:id')
  deleteCategory(@Param('id') id: string) {
    return this.masterDataService.deleteCategory(id);
  }

  // ---------- COUNTRIES ----------
  @Get('countries')
  getCountries() {
    return this.masterDataService.getCountries();
  }

  @Post('countries')
  createCountry(@Body() body: any) {
    return this.masterDataService.createCountry(body);
  }

  @Delete('countries/:id')
  deleteCountry(@Param('id') id: string) {
    return this.masterDataService.deleteCountry(id);
  }
}
