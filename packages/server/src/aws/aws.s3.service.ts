import { S3 } from 'aws-sdk'
import { Express } from 'express'
import { Injectable } from '@nestjs/common'
import { IamService } from './aws.iam.service'

@Injectable()
export class AWSS3Service {
  constructor(private iamService: IamService) {}

  async uploadS3(file: Express.Multer.File, key: string) {
    const iam = await this.iamService.findOne('s3', {
      credential: { decrypt: true, fields: ['accessKeyId', 'secretAccessKey'] },
    })

    const s3 = new S3({
      accessKeyId: (iam.credentials as any).accessKeyId,
      secretAccessKey: (iam.credentials as any).secretAccessKey,
    })

    const data = await s3
      .upload({
        Bucket: (iam.params as any).bucket,
        Body: file.buffer,
        Key: key,
        ContentDisposition: 'inline',
        ContentType: file.mimetype,
      })
      .promise()

    return data
  }
}
