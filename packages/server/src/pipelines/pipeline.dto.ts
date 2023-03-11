import { PartialType } from '@nestjs/swagger'

export class CreatePipelineDto {
  title: string
  isSaved?: boolean
  workspaceId: string
  jobId: string
}

export class PipelineDto extends CreatePipelineDto {
  id: string
}

export class UpdatePipelineDto extends PartialType(CreatePipelineDto) {}
