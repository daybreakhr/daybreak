import { ApiProperty, PartialType } from '@nestjs/swagger'
import { Role } from '@prisma/client'

export class Invite {
  @ApiProperty({
    example: 'xyz@gmail.com',
    description: 'Email of the receiver',
    required: true
  })
  email: string

  @ApiProperty({
    example: 'member',
    description: 'role of the invitee',
    required: true,
    enum: Role
  })
  role: Role
}

export class CreateInvite extends PartialType(Invite){}
