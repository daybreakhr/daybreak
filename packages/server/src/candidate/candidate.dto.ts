import { PartialType } from '@nestjs/swagger'
import { CandidateStatus } from '@prisma/client'
import {
  IsEmail,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator'

export class CreateCandidateDto {
  /**
   * First name of the candidate
   * @example 'Himanshu'
   */
  @IsString()
  firstName: string

  /**
   * Middle name of the candidate
   * @example 'Mishra'
   */

  @IsOptional()
  @IsString()
  middleName?: string

  /**
   * Last name of the candidate
   * @example 'Kumar'
   */
  @IsString()
  lastName: string

  /**
   * Phone number of the candidate
   * @example '9938338322'
   */
  @IsNumberString()
  phone: string

  /**
   * Id of the affinda
   * @example 'abd6272bdddhd'
   */
  @IsString()
  affindaId: string

  /**
   * Url of Linkedin
   * @example 'https://www.linkedin.com/himanshu'
   */
  @IsUrl()
  linkedInUrl: string

  /**
   * Location of the candidate
   * @example 'Pune
   */
  @IsString()
  location: string

  /**
   * Email of the candidate
   * @example 'no-reply@daybreak-hr.com'
   */
  @IsEmail()
  email: string

  /**
   * url of the resume
   * @example 'https://s3.amazonaws.com/v2/shdhfherrhe2ddbdff'
   */
  @IsOptional()
  resume?: string

  /**
   * Rejection message
   * @example 'Lack of experience'
   */
  @IsOptional()
  @IsString()
  rejectionMessage?: string

  /**
   * Id of Job
   * @example '53633abacd2636363'
   */
  @IsString()
  jobId: string

  /**
   * status of the candidature
   * @example 'applied'
   */
  @IsOptional()
  @IsEnum(CandidateStatus)
  status?: CandidateStatus

  /**
   * Id of Workspace
   * @example '53633abacd2636363'
   */
  @IsString()
  workspaceId: string
}

export class CandidateDto extends CreateCandidateDto {
  /**
   * Id of candidate
   * @example '53633abacd2636363'
   * @readonly
   */
  @IsString()
  id: string
}

export class UpdateCandidateDto extends PartialType(CreateCandidateDto) {}
