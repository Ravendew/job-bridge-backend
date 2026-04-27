import { IsArray, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateJobDto {
  @IsString()
  title: string;

  @IsString()
  companyName: string;

  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsString()
  category: string;

  @IsString()
  salary: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  vacancies?: number;

  @IsOptional()
  @IsString()
  experience?: string;

  @IsString()
  description: string;

  @IsArray()
  responsibilities: string[];

  @IsArray()
  benefits: string[];

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  companyLogoUrl?: string;
}
