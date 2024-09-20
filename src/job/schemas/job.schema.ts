import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
})

export class Job {
  @Prop({ required: true })
  company: string;

  @Prop({ required: true })
  position: string;

  @Prop({ enum: ['interview', 'declined', 'pending'], default: 'pending' })
  status: string;

  @Prop({ required: true })
  location: string

  @Prop({ required: true })
  salaryRangeMin: number;

  @Prop()
  salaryRangeMax: number;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  createdBy: string;

}

export const JobSchema = SchemaFactory.createForClass(Job);
