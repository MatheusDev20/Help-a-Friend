import path from 'path';
import fs from 'fs';
import { Storage } from '../../data/protocols/storage';
import upload from '../../config/upload';

class DiskStorage implements Storage {
  public async uploadFile(fileName: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(upload.directory, fileName),
      path.resolve(upload.directory, fileName),
    );
    return fileName;
  }

  public async listBuckets(): Promise<any> {
    console.log('?');
  }
}

export default DiskStorage;
