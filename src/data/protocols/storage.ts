export interface Storage {
  uploadFile: (fileName: string) => Promise<string>
}
