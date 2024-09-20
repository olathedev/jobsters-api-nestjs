import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { JobStatus, JobType } from '../enums/job.enum';

@Schema({
  timestamps: true,
})

export class Job {
  @Prop({ required: true })
  company: string;

  @Prop({ required: true })
  position: string;

  @Prop({ enum: JobStatus, default: JobStatus.OPEN })
  status: string;

  @Prop({ required: true })
  location: string

  @Prop({ required: true, enum: JobType })
  jobType: JobType

  @Prop()
  salaryRangeMin: number;

  @Prop()
  salaryRangeMax: number;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  createdBy: string;

}

export const JobSchema = SchemaFactory.createForClass(Job);
