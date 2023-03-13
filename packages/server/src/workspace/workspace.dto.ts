import { PartialType } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class CreateWorkspaceDto {
  /**
   * Name of the company
   * @example 'Microsoft'
   */
  @IsString()
  name: string

  /**
   * Unique identifier for the company
   * @example 'microsoft'
   */
  @IsString()
  slug: string

  /**
   * Something nice about to company to understand about it a bit
   * @example 'Microsoft Corporation is an American multinational technology corporation producing computer software, consumer electronics, personal computers, and related services headquartered at the Microsoft Redmond campus located in Redmond, Washington, United States.'
   */

  @IsOptional()
  @IsString()
  description?: string
}

export class UpdateWorkspaceDto extends PartialType(CreateWorkspaceDto) {}
