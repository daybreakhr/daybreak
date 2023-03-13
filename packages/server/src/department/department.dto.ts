import { IsString } from 'class-validator'

export class DepartmentDto {
  /**
   * Name for a department
   * @example 'Engineering'
   */
  @IsString()
  name: string

  /**
   * Id of workspace
   * @example '6317158147089f094cd4598e'
   */
  @IsString()
  workspaceId: string
}
