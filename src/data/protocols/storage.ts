export interface Storage {
  uploadFile: (fileName: string, resource: string) => Promise<string>
  uploadMultipleFiles(filenames: string[], resource: string): any
}
