import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto, UpdateJobDto } from './dto/job.dto';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}
  @Get()
  async getAllJobs(@Query() query: any) {
    console.log(query);
    
    return this.jobService.getAll(query);
  }

  @Post()
  createNewJob(
    @Body()
    job: CreateJobDto,
  ) {
    return this.jobService.create(job);
  }

  @Get(':id')
  getSinglejob(@Param('id') id: string) {
    return this.jobService.getOne(id)
  }

  @Patch(':id')
  updateJob(@Param('id') id: string, @Body() body: UpdateJobDto) {
    // console.log(id)
    return this.jobService.updateJob(id, body)
  }

  @Delete(':id')
  deleteJob(@Param('id') id: string) {
    return this.jobService.deleteOne(id) 
    }
}
