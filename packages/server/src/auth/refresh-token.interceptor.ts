import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Observable, tap } from 'rxjs'
import { ConfigService } from '@nestjs/config'
import type { Credentials } from 'google-auth-library'
import { PrismaService } from 'src/prisma.service'
import { AuthService } from './auth.service'

@Injectable()
export class RefreshTokenInterceptor implements NestInterceptor {
  constructor(
    private authService: AuthService,
    private readonly configService: ConfigService,
    private prismaService: PrismaService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest()
    const response = context.switchToHttp().getResponse()

    const uid = request.user.uid
    const accessToken = request.cookies?.access_token

    let newCredentials: Credentials | undefined
    // Update access token if it is expired
    if (!accessToken) {
      newCredentials = await this.authService.getRefreshAccessToken(uid)
      if (newCredentials) {
        // set new access token in the cookie
        request.cookies.access_token = newCredentials.access_token
      }
    }

    return next.handle().pipe(
      tap(() => {
        if (newCredentials?.access_token) {
          // set new access token in the cookie
          response.cookie('access_token', newCredentials.access_token, {
            expires: new Date(newCredentials.expiry_date - 5000),
            domain: this.configService.get<string>('COOKIE_DOMAIN'),
          })
        }
      }),
    )
  }
}
