import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { v4 } from 'uuid';
import User from '../models/User.entity';
import AppError from '../errors/AppError';

interface Request {
    name:string;
    email:string;
    password:string;
}
class CreateUserService {
  public async execute({ name, email, password }: Request):Promise<User> {
    const userRepository = getRepository(User);
    // Check email
    const existedEmail = await userRepository.findOne({ where: { email } });

    if (existedEmail) {
      throw new AppError('Email already Taken');
    }
    const hashedPassword = await hash(password, 8);
    const randomId = v4();
    const user = userRepository.create({
      id: randomId,
      name,
      email,
      password: hashedPassword,
    });
    await userRepository.save(user);
    return user;
  }
}
export default CreateUserService;
