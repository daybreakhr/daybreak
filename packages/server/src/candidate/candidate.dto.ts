import { PartialType } from '@nestjs/swagger'
import { CandidateStatus } from '@prisma/client'
import { IsEnum, IsOptional, IsString } from 'class-validator'

export class CreateCandidateDto {
  @IsString()
  firstName: string

  @IsOptional()
  @IsString()
  middleName: string

  @IsString()
  lastName: string

  @IsString()
  phone: string

  @IsString()
  affindaId: string

  @IsString()
  linkedInUrl: string

  @IsString()
  location: string

  @IsString()
  email: string

  @IsOptional()
  resume: string | null

  @IsOptional()
  @IsString()
  rejectionMessage: string

  @IsString()
  jobId: string

  @IsOptional()
  @IsEnum(CandidateStatus)
  status: CandidateStatus

  @IsString()
  workspaceId: string
}

export class CandidateDto extends CreateCandidateDto {
  @IsString()
  id: string

  @IsString()
  createdAt: string
}

export class UpdateCandidateDto extends PartialType(CreateCandidateDto) {}
