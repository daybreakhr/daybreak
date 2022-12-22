import { ApiProperty, PartialType } from '@nestjs/swagger'
import { Prisma, Category } from '@prisma/client'

export class Template {
  @ApiProperty({
    example: 'Template 1',
    description: 'title of Template',
    required: true,
  })
  title: string

  @ApiProperty({
    example: '<p>Editor output</p>',
    description: 'Editor output of description',
    required: false
  })
  description: Prisma.JsonValue

  @ApiProperty({
    example: 'it',
    description: 'category of template',
    required: true,
    enum: Category
  })
  category: Category
}

export class CreateTemplate extends PartialType(Template){}
