import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { AuthService } from './auth.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest()

    const member = await this.prismaService.member.findFirst({
      where: {
        // @ts-ignore
        uid: request.user.uid,
      },
    })

    if (member && member.isSuspended) {
      return false
    }

    // @ts-ignore
    return !!request.user
  }
}
