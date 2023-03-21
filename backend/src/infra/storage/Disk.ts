import path from 'path';
import fs from 'fs';
import upload from '../../config/storage/upload';

class DiskStorage {
  public async uploadFile(fileName: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(upload.directory, fileName),
      path.resolve(upload.directory, fileName),
    );
    return fileName;
  }
}

export default DiskStorage;
