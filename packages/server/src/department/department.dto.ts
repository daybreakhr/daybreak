export class CreateDepartmentDto {
  name: string

  workspaceId: string
}

export class DepartmentDto extends CreateDepartmentDto {
  id: string
}
