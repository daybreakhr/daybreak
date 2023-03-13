import { PartialType } from '@nestjs/swagger'
import { Currency, JobType, Priority } from '@prisma/client'
import {
  IsOptional,
  IsString,
  IsEnum,
  IsBoolean,
  IsArray,
  IsInt,
} from 'class-validator'

export class CreateJobDto {
  /**
   * Id of workspace
   * @example '56acb2435353355a'
   */
  @IsString()
  workspaceId: string
}

export class Job {
  /**
   * title of Job
   * @example 'Software Engineer'
   */
  @IsOptional()
  @IsString()
  title?: string

  /**
   * priority of job
   * @example 'high'
   */
  @IsEnum(Priority)
  priority: Priority

  /**
   * Id of department
   * @example '9a3382e7332fac263632'
   */
  @IsOptional()
  @IsString()
  departmentId?: string

  /**
   * Type of job
   * @example 'fullTime'
   */
  @IsOptional()
  @IsEnum(JobType)
  jobType?: JobType

  /**
   * Id of Location
   * @example '9a3382e7332fac263632'
   */
  @IsOptional()
  @IsString()
  locationId?: string

  /**
   * Whether a Job is remote or not
   * @example true
   */
  @IsBoolean()
  isRemote: boolean

  /**
   * Editor output of description
   * @example '<p>Editor output</p>'
   */
  @IsOptional()
  @IsString()
  description?: string

  /**
   * skills required for a job
   * @example ['java', 'aws']
   */
  @IsArray()
  skills: string[]

  /**
   * experience required for a job
   * @example '4'
   */
  @IsOptional()
  @IsString()
  experience?: string

  /**
   * currency of job paycheck
   * @example 'usd'
   */
  @IsOptional()
  @IsEnum(Currency)
  currency?: Currency

  /**
   * min salary of a job
   * @example 50000
   */
  @IsOptional()
  @IsInt()
  minSalary?: number

  /**
   * max salary of a job
   * @example 80000
   */
  @IsOptional()
  @IsInt()
  maxSalary?: number

  /**
   * Whether a job is published
   * @example true
   */
  @IsBoolean()
  isPublished: boolean

  /**
   * Id of workspace
   * @example '9a3382e7332fac263632'
   */
  @IsString()
  workspaceId: string
}

export class UpdateJob extends PartialType(Job) {}
