import { IsNotEmpty, IsString } from 'class-validator';

export class ToggleSavedJobDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  jobId: string;
}
