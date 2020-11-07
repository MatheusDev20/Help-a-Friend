import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import AppError from '../errors/AppError';
import User from '../models/User.entity';
import uploadConfig from '../config/upload';

interface Request {
    id: string;
    filename:string
}
class UpdateUserAvatar {
  public async execute({ id, filename }: Request): Promise<User> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(id);
    if (!user) {
      throw new AppError('User not authenticated', 401);
    }
    if (user.avatar) {
      const UserAvatarFilePath = path.join(
        uploadConfig.directory,
        user.avatar,
      );
      const userAvatarFileExists = await fs.promises.stat(
        UserAvatarFilePath,
      );
      if (userAvatarFileExists) {
        await fs.promises.unlink(UserAvatarFilePath);
      }
    }
    user.avatar = filename;
    userRepository.save(user);
    return user;
  }
}
export default UpdateUserAvatar;
