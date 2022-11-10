import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaService } from 'src/prisma.service'
import { decrypt } from 'src/utils'
import { IamFieldOption } from './types/iamFieldOption.types'

@Injectable()
export class IamService {
  constructor(
    private prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  private readonly cryptoKey = this.configService.get<string>('CRYPTO_KEY')

  async findOne(
    subType: string,
    options: IamFieldOption = { credential: { decrypt: true } },
  ) {
    const iam = await this.prismaService.iam.findUnique({ where: { subType } })

    if (
      iam &&
      options.credential.decrypt &&
      options.credential.fields.length > 0
    ) {
      for (const field of options.credential.fields) {
        // decrypt values one by one
        if (iam.credentials[field]) {
          // decrypt function
          iam.credentials[field] = decrypt(
            iam.credentials[field],
            this.cryptoKey,
          )
        }
      }
    }

    return iam
  }
}
