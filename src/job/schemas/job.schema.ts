import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
  createdBy: string;
}

export const JobSchema = SchemaFactory.createForClass(Job);
