import { encrypt } from 'src/utils/encrypt'
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

    const accessToken = request.cookies?.access_token

    let newCredentials: Credentials | undefined

    // Update access token if it is expired
    if (!accessToken) {
      newCredentials = await this.authService.getRefreshAccessToken(
        request.user.uid,
      )
      // set new access token in the cookie
      request.cookies.access_token = newCredentials.access_token

      const ivByteSize = this.configService.get<number>(
        'GOOGLE_ENCRYPT_TOKEN_BYTE_SIZE',
      )
      const password = this.configService.get<string>('GOOGLE_ENCRYPT_TOKEN')

      const encryptedToken = await encrypt(
        newCredentials.refresh_token,
        password,
        ivByteSize,
      )

      await this.prismaService.member.update({
        where: { uid: request.user.uid },
        data: {
          googleRefreshToken: encryptedToken,
        },
      })
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
