import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseFilters, UseGuards } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto, UpdateJobDto } from './dto/job.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('jobs')
@UseGuards(AuthGuard(), RolesGuard)
export class JobController {
  constructor(private readonly jobService: JobService) { }
  @Get()
  async getAllJobs(@Query() query: any, @Req() req) {
    // console.log(req.user);
    return this.jobService.getAll(query);
  }

  @Post()
  @Roles(Role.Employer)
  createNewJob(
    @Body()
    job: CreateJobDto,

    @Req()
    req
  ) {
    return this.jobService.create(job, req.user._id);
  }

  @Roles(Role.Employer, Role.Admin)
  @Get('my-jobs')
  getEmployersJobs(@Req() req) {
    return this.jobService.getAllForEmployer(req.user._id)
  }

  @Get(':id')
  getSinglejob(@Param('id') id: string) {
    return this.jobService.getOne(id)
  }

  @Roles(Role.Employer, Role.Admin)
  @Patch(':id')
  updateJob(@Param('id') id: string, @Body() body: UpdateJobDto) {
    // console.log(id)
    return this.jobService.updateJob(id, body)
  }

  @Roles(Role.Employer, Role.Admin)
  @Delete(':id')
  deleteJob(@Param('id') id: string) {
    return this.jobService.deleteOne(id)
  }
}
