import { PartialType } from '@nestjs/swagger'

export class CreateInterviewDto {
  title: string
  order: number
  pipelineId: string
}

export class InterviewDto extends CreateInterviewDto {
  id: string
  createdBy: string
  createdAt: string
  updatedAt: string
}

export class UpdateInterviewDto extends PartialType(CreateInterviewDto) {}
