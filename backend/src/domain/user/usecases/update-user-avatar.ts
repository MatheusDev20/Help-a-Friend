import { User } from '../models/user';

export interface UpdateUserAvatarDTO {
  id: string;
  filename: string;
}
export interface UpdateUserAvatar {
  update: (data: UpdateUserAvatarDTO) => Promise<User>
}
