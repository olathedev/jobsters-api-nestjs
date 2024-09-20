import { IsEmpty, IsEnum, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { User } from 'src/user/schemas/user.schema';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  company: string;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsString()
  @IsOptional()
  description: string

  @IsString()
  @IsNotEmpty()
  location: string

  @IsNumber()
  @IsOptional()
  @Min(0)
  salaryRangeMin: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  salaryRangeMax: number;

  @IsString()
  @IsEmpty({ message: "you should not provvide a value for user field" })
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
