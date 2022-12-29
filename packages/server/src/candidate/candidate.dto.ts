import { ApiProperty } from '@nestjs/swagger'
import { CandidateStatus } from '@prisma/client'
import { IsOptional, IsString } from 'class-validator'

export class CreateCandidateDto {
  @ApiProperty({
    example: 'Ramesh',
    description: 'First Name',
  })
  @IsString()
  firstName: string

  @ApiProperty({
    example: 'Kumar',
    description: 'Middle Name',
    required: false,
  })
  @IsOptional()
  @IsString()
  middleName: string

  @ApiProperty({
    example: 'Chadha',
    description: 'Last Name',
  })
  @IsString()
  lastName: string

  @ApiProperty({
    example: '+919163956458',
    description: 'Phone number',
  })
  @IsString()
  phone: string

  @ApiProperty({
    example: 'GFvCURjk',
    description: 'Affinda id to fetch parsed data',
  })
  @IsString()
  affindaId: string

  @ApiProperty({
    example: 'https://linkedin.com/in/rameshkumarchadha',
    description: 'Linkedin url of candidate',
  })
  @IsString()
  linkedInUrl: string

  @ApiProperty({
    example: 'Bangalore',
    description: 'Current location of candidate',
  })
  @IsString()
  location: string

  @ApiProperty({
    example: 'ramesh.chadha@gmail.com',
    description: 'Email address',
  })
  @IsString()
  email: string

  @ApiProperty({
    example: 'Rejected due to lack of clarity of AWS concepts',
    description: 'Rejection Message',
    required: false,
  })
  @IsOptional()
  @IsString()
  rejectionMessage: string

  @ApiProperty({
    example: '6353816a46c2e84a635460ab',
    description: 'id of job for which candidate applied',
  })
  @IsString()
  jobId: string
}

export class CandidateDto {
  @ApiProperty({
    example: '63a18917706dfc29c7bdc207',
    description: 'unique id of candidate',
  })
  id: string

  @ApiProperty({ example: 'Ramesh', description: 'First Name' })
  firstName: string

  @ApiProperty({ example: 'Kumar', description: 'Middle Name' })
  middleName: string | null

  @ApiProperty({ example: 'Chadha', description: 'Last Name' })
  lastName: string

  @ApiProperty({
    example: 'ramesh.chadha@gmail.com',
    description: 'Email address',
  })
  email: string

  @ApiProperty({ example: '+919163956458', description: 'Phone number' })
  phone: string

  @ApiProperty({
    example: 'Bangalore',
    description: 'Current location of candidate',
  })
  location: string

  @ApiProperty({
    example:
      'https://daybreakhr.s3.amazonaws.com/candidate/63a18917706dfc29c7bdc207/Smitendu%27s%20Resume.pdf',
    description: 'S3 url for resume',
  })
  resume: string | null

  @ApiProperty({
    example: 'GFvCURjk',
    description: 'Affinda id to fetch parsed data',
  })
  affindaId: string

  @ApiProperty({
    example: 'https://linkedin.com/in/rameshkumarchadha',
    description: '',
  })
  linkedInUrl: string

  @ApiProperty({ example: 'applied', description: 'current candidate status' })
  status: CandidateStatus

  @ApiProperty({
    example: '2022-12-20T10:06:14.702Z',
    description: 'Timestamp when candidate applied',
  })
  createdAt: Date

  @ApiProperty({
    example: '6353816a46c2e84a635460ab',
    description: 'id of job for which candidate applied',
  })
  jobId: string

  @ApiProperty({
    example: '6317158147089f094cd4598e',
    description: 'id of workspace',
  })
  workspaceId: string

  @ApiProperty({
    example: 'Rejected due to lack of clarity of AWS concepts',
    description: 'Rejection Message',
    required: false,
  })
  @IsString()
  @IsOptional()
  rejectionMessage: string
}
