import { PartialType } from '@nestjs/swagger'
import { Prisma, Category } from '@prisma/client'
import { IsEnum, IsJSON, IsOptional, IsString } from 'class-validator'

export class Template {
  /**
   * title of Template
   * @example 'Template 1'
   */
  @IsString()
  title: string

  /**
   * Editor output of description
   * @example '<p>Editor output</p>'
   */
  @IsOptional()
  @IsJSON()
  description?: Prisma.JsonValue

  /**
   * category of template
   * @example 'it'
   */
  @IsEnum(Category)
  category: Category
}

export class CreateTemplate extends PartialType(Template) {}
