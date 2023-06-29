export class WorkspaceCreatedEvent {
  constructor(
    public readonly workspaceId: string,
    public readonly uid: string,
  ) {}
}
