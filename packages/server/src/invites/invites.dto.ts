import { ApiProperty, PartialType } from '@nestjs/swagger'
import { Role } from '@prisma/client'
import { IsEmail, IsEnum } from 'class-validator'

export class Invite {
  @ApiProperty({
    example: 'xyz@gmail.com',
    description: 'Email of the receiver',
    required: true,
  })
  @IsEmail()
  email: string

  @ApiProperty({
    example: 'member',
    description: 'role of the invitee',
    required: true,
    enum: Role,
  })
  @IsEnum(Role)
  role: Role
}

export class CreateInvite extends PartialType(Invite) {}
