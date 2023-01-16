import { Inject, Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction } from 'express'
import { PrismaService } from 'src/prisma.service'
import { AuthService } from './auth.service'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @Inject(AuthService)
    private authService: AuthService,
    private prismaService: PrismaService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers as { authorization?: string }

    if (authorization) {
      const user = await this.authService.verifyIdToken(authorization)

      const member = await this.prismaService.member.findFirst({
        where: {
          uid: user.uid,
        },
      })

      if (user && !member.isSuspended) {
        // @ts-ignore
        req.user = user
      }
    }

    next()
  }
}
