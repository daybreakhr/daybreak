import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { S3 } from 'aws-sdk'

@Injectable()
export class S3Service {
  constructor(private readonly configService: ConfigService) {}

  async uploadS3(file: Buffer, key: string) {
    const s3 = new S3({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    })

    const data = await s3
      .upload({
        Bucket: this.configService.get<string>('AWS_BUCKET_NAME'),
        Body: file,
        Key: key,
        ContentDisposition: 'inline',
      })
      .promise()

    return data
  }
}
