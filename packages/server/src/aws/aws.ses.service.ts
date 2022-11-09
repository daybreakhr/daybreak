import * as nodemailer from 'nodemailer'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AWSSESService {
  async sendMail(sendMailDto: { to: string; subject: string; body: string }) {
    const mailerClient = nodemailer.createTransport({
      host: 'email-smtp.us-east-1.amazonaws.com',
      port: 587,
      auth: {
        user: 'AKIAUMZRIOK3PWYBQHLC',
        pass: 'BBz646HNE3kUKhxoLygng60g0VRVekztOndlTd3nP4+7',
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
