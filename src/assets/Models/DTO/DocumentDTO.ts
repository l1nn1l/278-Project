export class DocumentDTO {
  constructor(
    public _id: string,
    public title: string,
    public fileName: string,
    public filePath: string,
    public ownerId: string,
    public uploadDate: string,
    public fileSize: number,
    public sharedWith: any[],
    public deleted: boolean,
    public type: string,
    public starred: boolean,
    public refDocs: any[],
    public parentDir: string,
    public dateOfLastModified: string,
    public dateOfDeletion: string

  ) {}
}
