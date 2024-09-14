import { Injectable, NotFoundException } from '@nestjs/common';
import { Job } from './schemas/job.schema';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateJobDto, UpdateJobDto } from './dto/job.dto';
import { log } from 'console';

@Injectable()
export class JobService {
  constructor(@InjectModel(Job.name) private jobModel: mongoose.Model<Job>) { }

  async getAll(query: any): Promise<any> {
    let filters = {}

    if(query.company) {
      filters['company'] = {$regex: query.company, $options: 'i'}
    }
    if(query.position) {
      filters['position'] = {$regex: query.position, $options: 'i'}
    }
    if(query.status) {
      filters['status'] = query.status
    }
    if(query.search) {
      filters = { $or: [
        {company: {$regex: query.search, $options: 'i'}},
        {position: {$regex: query.search, $options: 'i'}},
        
      ] }
    }

    const limit = query.limit || 2
    const currentPage = Number(query.page) || 1
    const skip = (currentPage - 1) * limit
    const jobs = await this.jobModel.find(filters).skip(skip).limit(limit);
    const total = await this.jobModel.countDocuments(filters)
    return {
      jobs,
      total,
      currentPage: currentPage,
      totalPages: Math.ceil(total/limit)
    };
  }

  async create(CreateJobDto: CreateJobDto): Promise<Job> {
    CreateJobDto.createdBy = '1234ryuiuh'
    const job = await this.jobModel.create(CreateJobDto);
    return job;
  }

  async getOne(id: string) {
    const job = await this.jobModel.findOne({ _id: id });

    if (!job) {
      throw new NotFoundException('No job found with provided ID');
    }

    return job;
  }

  async updateJob(id: string, UpdateJobDto: UpdateJobDto) {
    console.log('woosa')
    console.log(this.updateJob);

    const job = await this.jobModel.findOneAndUpdate(
      { _id: id },
      UpdateJobDto,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!job) {
      throw new NotFoundException('No job found with provided ID');
    }

    return job;
  }

  async deleteOne(id: string) {
    const job = await this.jobModel.findOneAndDelete({ _id: id })

    if (!job) {
      throw new NotFoundException('No job found with provided ID');
    }

    return { message: 'record successfully deleted' }
  }
}
