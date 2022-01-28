import path from 'path';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';
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
  constructor(@inject('UserRepository') private userRepository: IUsersRepositoriy) { }

  public async update({ id, filename }: Request): Promise<User> {
    console.log('Get in the service');
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new AppError('User not authenticated', 401);
    }
    console.log(user);
    if (user.avatar) {
      const file = user.avatar.split('/');
      console.log(file);
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
    const avatarUrl = `${process.env.LOCAL_API_URL}/files/${filename}`;
    user.avatar = avatarUrl;
    this.userRepository.save(user);
    return user;
  }
}
export default UpdateUserAvatarUseCase;
