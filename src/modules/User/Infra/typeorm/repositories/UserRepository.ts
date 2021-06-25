import { getRepository, Repository } from 'typeorm';
import IUsersRepository from '@modules/User/Repositories/IUsersRepositoriy';
import CreateUserDTO from '../../../Dto/CreateUserDTO';
import User from '../entities/User';

class UserRepository implements IUsersRepository {
  private userRepository: Repository<User> // Declarando o atributo do orm da classe

  constructor() {
    this.userRepository = getRepository(User);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    return user;
  }

  public async create(data: CreateUserDTO): Promise<User> {
    const user = await this.userRepository.create(data);

    await this.userRepository.save(user);

    return user;
  }

  public async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.createQueryBuilder('user').getMany();
    return users;
  }
}

export default UserRepository;
