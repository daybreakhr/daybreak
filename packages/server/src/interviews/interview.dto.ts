import { ApiProperty, PartialType } from '@nestjs/swagger'

export class Interview {
  @ApiProperty({
    example: 'Interview Stage 1',
    description: 'title of Interview stage',
    required: true,
  })
  title: string

  @ApiProperty({
    example: '1',
    description: 'Order of this stage',
    required: true,
  })
  order: number
}

export class CreateInterview extends PartialType(Interview) {}
