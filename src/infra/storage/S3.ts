import aws, { S3 } from 'aws-sdk';
import path from 'path';
import fs from 'fs';
import buildPathS3 from '../helpers/buildPathS3';
import upload from '../../config/upload';
import { Storage } from '../../data/protocols/storage';

export interface Buckets {
  name: string;
  creationDate: Date
}
class S3Storage implements Storage {
  private s3Client: S3

  constructor() {
    this.s3Client = new aws.S3({
      region: 'us-east-1',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  public async uploadFile(fileName: string): Promise<any> {
    const originalPath = path.resolve(upload.directory, fileName);
    const fileContent = await fs.promises.readFile(originalPath);
    const ret = await this.s3Client.putObject({
      Bucket: process.env.BUCKET_NAME,
      Key: buildPathS3(fileName),
      ACL: 'public-read',
      Body: fileContent,
    }).promise();
    console.log(ret);
    return fileName;
  }

  async listBuckets(): Promise<any> {
    const getBuckets = new Promise((resolve, reject) => {
      this.s3Client.listBuckets((err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });

    return getBuckets;
  }
}
export default S3Storage;
