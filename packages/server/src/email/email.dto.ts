import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'

export class CreateEmailDto {
  @ApiProperty({
    example: 'Sample subject for the gmail',
    description: 'Subject of Gmail message',
  })
  @IsString()
  subject: string

  @ApiProperty({
    example: 'rahulmudulakar@gmail.com',
    description: 'Email of the receiver',
  })
  @IsEmail()
  to: string

  @ApiProperty({
    example: 'message body',
    description: 'Message body',
  })
  @IsString()
  body: string
}

export class EmailDto extends CreateEmailDto {
  @ApiProperty({
    example: '632af2f17685417736bc0606',
    description: 'id from our database',
  })
  id: string

  @ApiProperty({
    example:
      'NjVnamFwMzFjZ3NqMmJiMjYxaW02YjlrYzhxbTZiOW9jY282YWI5aWNoaGphb2hpY2hnajRjOXBjNF8yMDIzMDEyNVQxNjMwMDBaIGhpbS5uYWdyYXRoQG0',
    description: 'Message ID from gmail',
  })
  @IsString()
  messageId: string
}
