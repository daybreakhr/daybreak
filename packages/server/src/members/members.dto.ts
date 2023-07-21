import { Role } from '@prisma/client'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsBoolean, IsEnum, IsOptional } from 'class-validator'

export class MemberDto {
  @ApiProperty({
    example: 'SfVQfbDIPsYxpxJp7iNMRE2tdla2',
    description: 'Firebase id of the member',
  })
  uid: string

  @ApiProperty({
    example: 'admin',
    description: 'role of Member',
    required: true,
    enum: Role,
  })
  role: Role

  @ApiProperty({
    example: '9a3382e7332fac263632',
    description: 'id of workspace',
    required: true,
  })
  workspaceId: string

  @ApiPropertyOptional({
    example: false,
    description: 'Whether this member is suspended or not',
    required: false,
  })
  isSuspended: boolean

  @ApiProperty({
    example: '638ca581202bf45fadf5e31e',
    description: 'id of the member',
    required: true,
  })
  id: string

  Integration: {
    gmail?: { isInstalled?: boolean; createdAt?: Date }
    gcal?: { isInstalled?: boolean; createdAt?: Date }
    slack?: { isInstalled?: boolean; createdAt?: Date }
  }

  googleRefreshToken?: {
    iv: string
    text: string
  }

  slackBotToken?: {
    iv: string
    text: string
  }

  slackBotUserId?: string

  slackUserId?: string
}

export class UpdateMemberDto {
  @IsEnum(Role)
  @IsOptional()
  role?: Role

  @IsBoolean()
  @IsOptional()
  isSuspended?: boolean

  @IsOptional()
  slackBotToken?: {
    iv: string
    text: string
  }

  @IsOptional()
  slackBotUserId?: string

  @IsOptional()
  slackUserId?: string
}

export class AddAppBody {
  @ApiProperty({
    example: 'gmail',
    description: 'Name of the app',
    required: true,
  })
  appName: 'gmail' | 'gcal'

  @ApiProperty({
    example: 'true',
    description: 'Boolean value to check if app is installed or not',
    required: true,
  })
  isInstalled: boolean
}
