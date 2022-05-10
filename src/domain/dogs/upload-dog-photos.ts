import { Dog } from './models/dog';
// Comentário
interface UploadDogImagesDto {
  userId: string;
  dogName: string;
  filename: string
}

export interface UploadDogImages {
  upload: (data: UploadDogImagesDto) => Promise<Dog>
}
