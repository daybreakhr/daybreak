import { IsOptional, IsString } from 'class-validator'

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
  linkedInUrl: string

  @IsString()
  location: string

  @IsString()
  email: string

  @IsString()
  jobId: string
}
