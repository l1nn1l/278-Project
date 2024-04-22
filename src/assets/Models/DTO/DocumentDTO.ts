export class DocumentDTO {
  constructor(
    public id: string,
    public title: string,
    public fileName: string,
    public filePath: string,
    public ownerId: string,
    public uploadDate: string,
    public fileSize: number,
    public sharedWith: any[],
    public deleted: boolean
  ) {}
}
