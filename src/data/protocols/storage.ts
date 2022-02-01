export interface Storage {
  uploadFile: (fileName: string) => Promise<string>
  listBuckets: () => Promise<any>
}
