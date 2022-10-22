import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { UserRecord } from 'firebase-admin/auth'

export const GetUser = createParamDecorator(
  (data, context: ExecutionContext): UserRecord => {
    const req = context.switchToHttp().getRequest()
    return req.user
  },
)
