import { IsEnum, IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  company: string;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  createdBy: string;
}

// export class UpdateCatDto extends PartialType(CreateCatDto) {}

export class UpdateJobDto {
  @IsString()
  @IsOptional()
  company: string;

  @IsString()
  @IsOptional()
  position: string;

  @IsString()
  @IsOptional()
  createdBy: string;

  @IsString()
  @IsOptional()
  @IsIn(['pending', 'interview', 'declined'])
  status: string
}
