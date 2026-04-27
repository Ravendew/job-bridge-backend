import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  jobId: string;

  @IsObject()
  profileData: Record<string, any>;

  @IsOptional()
  @IsObject()
  documents?: Record<string, any>;
}
