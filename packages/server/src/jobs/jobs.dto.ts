import { ApiProperty, PartialType } from '@nestjs/swagger'
import { Currency, JobType, Priority } from '@prisma/client'
import { IsOptional, IsString } from 'class-validator'

export class CreateJobDto {
  @IsString()
  workspaceId: string
}

export class JobDto {
  @ApiProperty({
    example: 'Software Engineer',
    description: 'title of Job',
    required: false,
  })
  @IsOptional()
  title: string

  @ApiProperty({
    example: 'Software Engineer',
    description: 'title of Job',
    required: true,
    enum: Priority,
  })
  priority: Priority

  @ApiProperty({
    example: '9a3382e7332fac263632',
    description: 'id of department',
    required: false,
  })
  @IsOptional()
  departmentId: string

  @ApiProperty({
    example: 'fullTime',
    description: 'type of Job',
    required: false,
    enum: JobType,
  })
  @IsOptional()
  jobType: JobType

  @ApiProperty({
    example: '9a3382e7332fac263632',
    description: 'id of location',
    required: false,
  })
  @IsOptional()
  locationId: string

  @ApiProperty({
    example: true,
    description: 'Whether a Job is remote or not',
    required: true,
  })
  isRemote: boolean

  @ApiProperty({
    example: '<p>Editor output</p>',
    description: 'Editor output of description',
    required: false,
  })
  @IsOptional()
  description: string

  @ApiProperty({
    example: ['java', 'aws'],
    description: 'skills required for a job',
    required: true,
  })
  skills: string[]

  @ApiProperty({
    example: '4',
    description: 'experience required for a job',
    required: false,
  })
  @IsOptional()
  experience: string

  @ApiProperty({
    example: 'usd',
    description: 'currency of job paycheck',
    required: false,
    enum: Currency,
  })
  @IsOptional()
  currency: Currency

  @ApiProperty({
    example: 50000,
    description: 'min salary of a job',
    required: false,
  })
  @IsOptional()
  minSalary: number

  @ApiProperty({
    example: 80000,
    description: 'max salary of a job',
    required: false,
  })
  @IsOptional()
  maxSalary: number

  @ApiProperty({
    example: true,
    description: 'Whether a job is published',
    required: true,
  })
  isPublished: boolean

  @ApiProperty({
    example: '9a3382e7332fac263632',
    description: 'id of workspace',
    required: true,
  })
  workspaceId: string
}

export class UpdateJob extends PartialType(JobDto) {}
