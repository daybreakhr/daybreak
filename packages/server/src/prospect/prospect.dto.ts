import { IsString, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { string } from 'joi'

export class CreateProspectDto {
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
    example: 'https://linkedin.com/in/rameshkumarchadha',
    description: 'Linkedin url of prospect',
  })
  @IsString()
  linkedInUrl: string

  @ApiProperty({
    example: 'Bangalore',
    description: 'Current location of prospect',
  })
  @IsString()
  location: string

  @ApiProperty({
    type: [string],
    description: "Array of Job ID's",
    example: ['63a18917706dfc29c7bdc207', '63a18917706dfc29c7bdc209'],
  })
  jobIds: string[]

  @ApiProperty({
    example: 'ramesh.chadha@gmail.com',
    description: 'Email address',
  })
  @IsString()
  email: string

  @ApiProperty({
    example:
      'https://daybreakhr.s3.amazonaws.com/prospect/63a18917706dfc29c7bdc207/Smitendu%27s%20Resume.pdf',
    description: 'S3 url for resume',
    required: false,
  })
  @IsOptional()
  resume: string | null
}

export class Prospect extends CreateProspectDto {
  @ApiProperty({
    example: '63a18917706dfc29c7bdc207',
    description: 'unique id of prospect',
  })
  id: string
}

export class AddProspectToCandidate {
  @ApiProperty({
    example: '63a18917706dfc29c7bdc207',
    description: 'unique id of job',
  })
  jobId: string

  @ApiProperty({
    example: 'GFvCURjk',
    description: 'Affinda id to fetch parsed data',
  })
  @IsString()
  affindaId: string
}
