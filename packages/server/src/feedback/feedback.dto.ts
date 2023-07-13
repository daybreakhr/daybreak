import { IsNumber, IsString, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateFeedbackDto {
  @ApiProperty({
    example: 'Phone Screen',
    description: 'title of feedback',
  })
  @IsString()
  title: string

  @ApiProperty({
    example:
      'candidate has very good understanding of aws and cloud technologies',
    description: 'feedback notes',
  })
  @IsString()
  notes: string

  @ApiProperty({
    example: '4.5',
    description: 'feedback score',
  })
  @IsNumber()
  score: number

  @ApiProperty({
    example: '83382e7332fac263632',
    description: 'uid of feedback giver',
  })
  @IsString()
  candidateId: string
}

export class Feedback {
  @ApiProperty({
    example: 'Phone Screen',
    description: 'title of feedback',
  })
  title: string

  @ApiProperty({
    example:
      'candidate has very good understanding of aws and cloud technolgies',
    description: 'feedback notes',
  })
  notes: string

  @ApiProperty({
    example: '4.5',
    description: 'feedback score',
  })
  score: number

  @ApiProperty({
    example: '44738-hsdhd-8rudhd-82929',
    description: 'uid of feedback giver',
    required: false,
    readOnly: true,
  })
  @IsOptional()
  createdBy: string

  @ApiProperty({
    example: '83382e7332fac263632',
    description: 'id of candidate',
    required: false,
    readOnly: true,
  })
  @IsOptional()
  candidateId: string
}
