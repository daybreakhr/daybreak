import { ApiProperty, PartialType } from '@nestjs/swagger'
import { Role } from '@prisma/client'

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

  @ApiProperty({
    example: false,
    description: 'Whether this member is suspended or not',
    required: false,
  })
  isSuspended: string
}

export class CreateMemberDto extends PartialType(MemberDto) {}

export class UpdateMemberDto extends PartialType(MemberDto) {}
