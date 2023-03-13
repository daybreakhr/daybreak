import { IsString } from 'class-validator'

export class CreateEmailDto {
  /**
   * Subject of Gmail message
   * @example 'Sample subject for the gmail'
   */
  @IsString()
  subject: string

  /**
   * Message body
   * @example 'message body'
   */
  @IsString()
  body: string
}

export class EmailDto extends CreateEmailDto {
  /**
   * Id of email from Db
   * @example '632af2f17685417736bc0606'
   * @readonly
   */
  id: string

  /**
   * Message ID from gmail
   * @example 'NjVnamFwMzFjZ3NqMmJiMjYxaW02YjlrYzhxbTZiOW9jY282YWI5aWNoaGphb2hpY2hnajRjOXBjNF8yMDIzMDEyNVQxNjMwMDBaIGhpbS5uYWdyYXRoQG0'
   */
  @IsString()
  messageId: string
}
