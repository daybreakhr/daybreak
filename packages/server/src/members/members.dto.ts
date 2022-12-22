import { ApiProperty, PartialType } from '@nestjs/swagger'
import { Role } from '@prisma/client'

export class Member {
  @ApiProperty({
    example: 'admin',
    description: 'role of Member',
    required: true,
    enum: Role
  })
  role: Role

  @ApiProperty({
    example: '9a3382e7332fac263632',
    description: 'id of workspace',
    required: true
  })
  workspaceId: string
}

export class CreateMember extends PartialType(Member){}
