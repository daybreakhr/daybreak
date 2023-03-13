import { PartialType } from '@nestjs/swagger'
import { Role } from '@prisma/client'
import { IsEmail, IsEnum } from 'class-validator'

export class Invite {
  /**
   * Email of the receiver
   * @example 'xyz@gmail.com'
   */
  @IsEmail()
  email: string

  /**
   * role of the invitee
   * @example 'member'
   */
  @IsEnum(Role)
  role: Role
}

export class CreateInvite extends PartialType(Invite) {}
