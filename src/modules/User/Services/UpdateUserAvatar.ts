import path from 'path';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';
import IUsersRepositoriy from '../Repositories/IUsersRepositoriy';
import AppError from '../../../errors/AppError';
import User from '../Infra/typeorm/entities/User';
import uploadConfig from '../../../config/upload';

interface Request {
  id: string;
  filename: string
}
@injectable()
class UpdateUserAvatar {
  constructor(@inject('UserRepository') private userRepository: IUsersRepositoriy) { }

  public async execute({ id, filename }: Request): Promise<User> {
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
export default UpdateUserAvatar;
