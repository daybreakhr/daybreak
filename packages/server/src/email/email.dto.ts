import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateEmailDto {
  @ApiProperty({
    example: 'Sample subject for the gmail',
    description: 'Subject of Gmail message',
  })
  @IsString()
  subject: string

  @ApiProperty({
    example: 'message body',
    description: 'Message body',
  })
  @IsString()
  body: string

  candidateId: string
}

export class EmailDto extends CreateEmailDto {
  id: string
  messageId: string
}
