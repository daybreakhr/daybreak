import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import type { Role } from '@prisma/client'
import { UserRecord } from 'firebase-admin/auth'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(PrismaService) private prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ])
    if (!requiredRoles) {
      return true
    }

    const { user }: { user: UserRecord & { role: Role } } = context
      .switchToHttp()
      .getRequest()

    const member = await this.prismaService.member.findUnique({
      where: { uid: user.uid },
    })

    return requiredRoles.some((role) => role === member.role)
  }
}
