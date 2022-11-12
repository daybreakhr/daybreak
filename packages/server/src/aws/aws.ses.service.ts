import * as nodemailer from 'nodemailer'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AWSSESService {
  constructor(private readonly configService: ConfigService) {}

  async sendMail(sendMailDto: { to: string; subject: string; body: string }) {
    const mailerClient = nodemailer.createTransport({
      host: this.configService.get<string>('AWS_SES_HOST'),
      port: this.configService.get<number>('AWS_SES_PORT'),
      auth: {
        user: this.configService.get<string>('AWS_SES_ACCESS_KEY_ID'),
        pass: this.configService.get<string>('AWS_SES_SECRET_ACCESS_KEY'),
      },
    })

    const data = await mailerClient.sendMail({
      from: 'no-reply@daybreakhire.com',
      to: sendMailDto.to,
      subject: sendMailDto.subject,
      html: sendMailDto.body,
    })

    return data
  }
}
