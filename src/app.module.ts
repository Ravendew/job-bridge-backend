import { Module } from '@nestjs/common';
import { ApplicationsModule } from './applications/applications.module';
import { AuthModule } from './auth/auth.module';
import { JobsModule } from './jobs/jobs.module';
import { MasterDataModule } from './master-data/master-data.module';
import { PrismaModule } from './prisma/prisma.module';
import { SavedJobsModule } from './saved-jobs/saved-jobs.module';
import { SuccessStoriesModule } from './success-stories/success-stories.module';
import { UploadModule } from './upload/upload.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    JobsModule,
    ApplicationsModule,
    SavedJobsModule,
    SuccessStoriesModule,
    AuthModule,
    UploadModule,
    MasterDataModule,
  ],
})
export class AppModule {}
