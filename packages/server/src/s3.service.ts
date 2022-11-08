import { S3 } from 'aws-sdk'
import { Express } from 'express'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class S3Service {
  constructor(private readonly configService: ConfigService) {}

  async uploadS3(file: Express.Multer.File, key: string) {
    const s3 = new S3({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    })

    const data = await s3
      .upload({
        Bucket: this.configService.get<string>('AWS_BUCKET_NAME'),
        Body: file.buffer,
        Key: key,
        ContentDisposition: 'inline',
        ContentType: file.mimetype,
      })
      .promise()

    return data
  }
}
