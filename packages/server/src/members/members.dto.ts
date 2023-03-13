import { Role } from '@prisma/client'
import { PartialType } from '@nestjs/swagger'
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator'

export class MemberDto {
  /**
   * Firebase id of the member
   * @example 'SfVQfbDIPsYxpxJp7iNMRE2tdla2'
   */
  @IsString()
  uid: string

  /**
   * role of Member
   * @example 'admin'
   */
  @IsEnum(Role)
  role: Role

  /**
   * Id of workspace
   * @example '9a3382e7332fac263632'
   */
  @IsString()
  workspaceId: string

  /**
   * Whether this member is suspended or not
   * @example false
   */
  @IsOptional()
  @IsBoolean()
  isSuspended?: boolean

  /**
   * Id of the member
   * @example '638ca581202bf45fadf5e31e'
   * @readonly
   */
  @IsOptional()
  @IsString()
  id?: string
}

export class CreateMemberDto extends PartialType(MemberDto) {}

export class UpdateMemberDto extends PartialType(MemberDto) {}

export class AddAppBody {
  /**
   * Name of the app
   * @example 'gmail'
   */
  @IsString()
  appName: 'gmail' | 'gcal'

  /**
   * Boolean value to check if app is installed or not
   * @example true
   */
  @IsBoolean()
  isInstalled: boolean
}
