import path from 'path';
import fs from 'fs';
import { Storage } from '../../protocols/storage';
import { UpdateUserAvatar, UpdateUserAvatarDTO } from '../../../domain/user/usecases/update-user-avatar';

import IUsersRepositoriy from '../../protocols/user-repository';
import AppError from '../../../errors/AppError';
import { User } from '../../../domain/user/models/user';
import uploadConfig from '../../../config/upload';

class UpdateUserAvatarUseCase implements UpdateUserAvatar {
  private readonly repository: IUsersRepositoriy;

  private readonly storage: Storage;

  constructor(repository: IUsersRepositoriy, storage: Storage) {
    this.repository = repository;
    this.storage = storage;
  }

  public async update({ id, filename }: UpdateUserAvatarDTO): Promise<User> {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new AppError('User not authenticated', 401);
    }

    if (user.avatar) {
      const file = user.avatar.split('/');
      const UserAvatarFilePath = path.join(
        uploadConfig.directory,
        file[file.length - 1],
      );

      const userAvatarFileExists = await fs.promises.stat(
        UserAvatarFilePath,
      );
      if (userAvatarFileExists) {
        await fs.promises.unlink(UserAvatarFilePath);
      }
    }
    const file = await this.storage.uploadFile(filename, 'users');

    const avatarUrl = process.env.ENVIROMENT === 'PROD'
      ? `${process.env.STORAGE_URL}/${file}`
      : `${process.env.STORAGE_URL}/${file}`;

    user.avatar = avatarUrl;
    this.repository.save(user);
    return user;
  }
}
export default UpdateUserAvatarUseCase;
