import * as nodemailer from 'nodemailer'
import { Injectable } from '@nestjs/common'
import { IamService } from './aws.iam.service'

@Injectable()
export class AWSSESService {
  constructor(private iamService: IamService) {}

  async sendMail(sendMailDto: { to: string; subject: string; body: string }) {
    const iam = await this.iamService.findOne('ses', {
      credential: { decrypt: true, fields: ['accessKeyId', 'secretAccessKey'] },
    })

    const mailerClient = nodemailer.createTransport({
      host: (iam.params as any).host,
      port: (iam.params as any).port,
      auth: {
        user: (iam.credentials as any).accessKeyId,
        pass: (iam.credentials as any).secretAccessKey,
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
