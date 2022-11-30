import { IsOptional, IsString } from 'class-validator'

export class CreateWorkspaceDto {
  @IsString()
  name: string

  @IsString()
  slug: string

  @IsOptional()
  @IsString()
  description: string
}
