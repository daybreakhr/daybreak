import { ApiProperty, PartialType } from '@nestjs/swagger'

export class Pipeline {
  @ApiProperty({
    example: 'Pipeline 1',
    description: 'title of Pipeline',
    required: true,
  })
  title: string

  @ApiProperty({
    example: true,
    description: 'whether the pipeline is saved or not',
    required: true,
  })
  isSaved: boolean
}

export class CreatePipeline extends PartialType(Pipeline) {}
