import { PartialType } from '@nestjs/swagger'
import { IsInt, IsString } from 'class-validator'

export class CreateInterviewDto {
  /**
   * Title of interview stage
   * @example 'Interview Stage 1'
   */
  @IsString()
  title: string

  /**
   * Order of interview stage
   * @example 2
   */
  @IsInt()
  order: number

  /**
   * Id of pipeline
   * @example '9a3382e7332fac263632'
   */
  @IsString()
  pipelineId: string
}

export class InterviewDto extends CreateInterviewDto {
  /**
   * Id of interview
   * @example '9a3382e7332fac263632'
   * @readonly
   */
  @IsString()
  id: string
}

export class UpdateInterviewDto extends PartialType(CreateInterviewDto) {}
