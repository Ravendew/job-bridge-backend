import { IsString } from 'class-validator';

export class CreateSuccessStoryDto {
  @IsString()
  name: string;

  @IsString()
  country: string;

  @IsString()
  jobTitle: string;

  @IsString()
  localSalary: string;

  @IsString()
  inrSalary: string;

  @IsString()
  story: string;

  @IsString()
  workingSince: string;
}
