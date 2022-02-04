export interface Storage {
  uploadFile: (fileName: string, resource: string) => Promise<string>
}
