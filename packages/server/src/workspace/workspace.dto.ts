import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class CreateWorkspaceDto {
  @ApiProperty({
    example: 'Microsoft',
    description: 'Name of the company',
    required: true,
  })
  @IsString()
  name: string

  @ApiProperty({
    example: 'microsoft',
    description: 'Unique identifier for the company',
    required: true,
  })
  @IsString()
  slug: string

  @ApiProperty({
    example:
      'Microsoft Corporation is an American multinational technology corporation producing computer software, consumer electronics, personal computers, and related services headquartered at the Microsoft Redmond campus located in Redmond, Washington, United States.',
    description: 'Something nice about to company to understand about it a bit',
  })
  @IsOptional()
  @IsString()
  description: string
}

export class UpdateWorkspaceDto extends PartialType(CreateWorkspaceDto) {}
