import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import type { Role } from '@prisma/client'
import { UserRecord } from 'firebase-admin/auth'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ])
    if (!requiredRoles) {
      return true
    }

    const { user }: { user: UserRecord } = context.switchToHttp().getRequest()

    return requiredRoles.some((role) => role === user.customClaims.role)
  }
}
