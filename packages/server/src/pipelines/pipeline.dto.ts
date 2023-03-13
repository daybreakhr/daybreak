import { PartialType } from '@nestjs/swagger'
import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class CreatePipelineDto {
  /**
   * title of the pipeline
   * @example 'Pipeline 1'
   */
  @IsString()
  title: string

  /**
   * whether to save this pipeline as a template or not
   * @example false
   */
  @IsOptional()
  @IsBoolean()
  isSaved?: boolean

  /**
   * Id of workspace
   * @example '522bca7262abd822cbe'
   */
  @IsString()
  workspaceId: string

  /**
   * Id of Job
   * @example '522bca7262abd822cbe'
   */
  @IsString()
  jobId: string
}

export class PipelineDto extends CreatePipelineDto {
  /**
   * Id of pipeline
   * @example '522bca7262abd822cbe'
   * @readonly
   */
  @IsString()
  id?: string
}

export class UpdatePipelineDto extends PartialType(CreatePipelineDto) {}
