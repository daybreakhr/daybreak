import { Attribute, EvaluationEnum } from '@prisma/client'
import { IsString, IsOptional, IsEnum, IsArray } from 'class-validator'

export class CreateFeedbackDto {
  @IsEnum(EvaluationEnum)
  evaluation: EvaluationEnum

  @IsOptional()
  @IsString()
  notes?: string

  @IsArray()
  attributes: Attribute[]

  interviewId: string

  candidateId: string
}

export class Feedback extends CreateFeedbackDto {
  id: string
  createdAt: Date
  createdBy: string
}
