interface Photo {
  imgId: string;
  url: string
}
// Comentário
interface UploadPetPhotosDTO {
  userId: string;
  petName: string;
  filenames: string[]
}

export interface UploadPetPhotos {
  upload: (data: UploadPetPhotosDTO) => Promise<Photo[]>
}
