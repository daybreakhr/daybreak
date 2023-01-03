export function getWorkspaceInitials(workspaceName: string): string {
  const initials = workspaceName
    .split(' ')
    .map((val) => val[0].toLocaleUpperCase())
    .join('')

  return initials
}
