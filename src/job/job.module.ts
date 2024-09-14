import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JobSchema } from './schemas/job.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Job', schema: JobSchema }])
  ],
  providers: [JobService],
  controllers: [JobController],
})
export class JobModule {}
