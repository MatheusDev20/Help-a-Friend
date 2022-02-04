import { Dog } from './models/dog';

interface UploadDogImagesDto {
  userId: string;
  dogName: string;
  filename: string
}

export interface UploadDogImages {
  upload: (data: UploadDogImagesDto) => Promise<Dog>
}
