import { ApiProperty } from '@nestjs/swagger'

export class DepartmentDto {
  @ApiProperty({
    example: 'Engineering',
    description: 'Name for a department',
    required: true,
  })
  name: string

  @ApiProperty({
    example: '6317158147089f094cd4598e',
    description: 'id of workspace',
    required: true,
  })
  workspaceId: string
}
