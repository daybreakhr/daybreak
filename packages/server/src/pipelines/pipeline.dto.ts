import { ApiProperty, PartialType } from '@nestjs/swagger'

export class Pipeline {
  @ApiProperty({
    example: '5acd273847438a2373',
    description: 'id of Pipeline',
    required: true,
    readOnly: true,
  })
  id: string

  @ApiProperty({
    example: 'Pipeline 1',
    description: 'title of Pipeline',
    required: true,
  })
  title: string

  @ApiProperty({
    example: true,
    description: 'whether the pipeline is saved or not',
    required: false,
  })
  isSaved: boolean
}

export class CreatePipeline extends PartialType(Pipeline) {}
