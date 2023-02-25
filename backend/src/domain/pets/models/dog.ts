import { User } from 'domain/user/models/user';

export interface Dog {
  id: string;
  name: string;
  gender: string;
  size: string;
  user_id: string;
  user: User
  photos: string;
  dog_photos: string;
  history: string;
  castrated: boolean;
  vaccinated: boolean
}
