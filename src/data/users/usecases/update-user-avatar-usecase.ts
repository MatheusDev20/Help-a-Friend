import path from 'path';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';
import { Storage } from '../../protocols/storage';
import IUsersRepositoriy from '../../protocols/user-repository';
import AppError from '../../../errors/AppError';
import { User } from '../../../domain/user/models/user';
import uploadConfig from '../../../config/upload';

interface Request {
  id: string;
  filename: string
}
@injectable()
class UpdateUserAvatarUseCase {
  constructor(@inject('UserRepository') private userRepository: IUsersRepositoriy, @inject('Storage') private storageProvider: Storage) { }

  public async update({ id, filename }: Request): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new AppError('User not authenticated', 401);
    }

    if (user.avatar) {
      const file = user.avatar.split('/');
      const UserAvatarFilePath = path.join(
        uploadConfig.directory,
        file[file.length - 1],
      );
      console.log(UserAvatarFilePath);
      const userAvatarFileExists = await fs.promises.stat(
        UserAvatarFilePath,
      );
      if (userAvatarFileExists) {
        await fs.promises.unlink(UserAvatarFilePath);
      }
    }
    const file = await this.storageProvider.uploadFile(filename);
    const avatarUrl = `${process.env.STORAGE_URL}/${file}`;
    user.avatar = avatarUrl;
    this.userRepository.save(user);
    return user;
  }
}
export default UpdateUserAvatarUseCase;
