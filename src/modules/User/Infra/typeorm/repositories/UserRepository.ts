import { getRepository, Repository } from 'typeorm';
import IUsersRepository from '@modules/User/Repositories/IUsersRepositoriy';
import CreateUserDTO from '../../../Dto/CreateUserDTO';
import Users from '../entities/User';

class UserRepository implements IUsersRepository {
  private userRepository: Repository<Users> // Declarando o atributo do orm da classe

  constructor() {
    this.userRepository = getRepository(Users);
  }

  public async findByEmail(email: string): Promise<Users | undefined> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async findById(id: string): Promise<Users | undefined> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    return user;
  }

  public async create(data: CreateUserDTO): Promise<Users> {
    const user = await this.userRepository.create(data);

    await this.userRepository.save(user);

    return user;
  }

  public async getAllUsers(): Promise<Users[]> {
    const users = await this.userRepository.createQueryBuilder('user').getMany();
    return users;
  }

  public async delete(user: Users): Promise<Users> {
    await this.userRepository.createQueryBuilder()
      .delete()
      .from(Users)
      .where('id =:id', { id: user.id })
      .execute();
    return user;
  }
}

export default UserRepository;
