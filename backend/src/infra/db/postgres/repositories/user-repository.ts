import { getRepository, Repository } from 'typeorm';
import { UserProfile } from '../../../../domain/user/dtos/UserProfile';
import IUsersRepository from '../../../../data/protocols/repositorys/user-repository';
import CreateUserDTO from '../../../../data/users/dto/create-user-dto';
import Users from '../entities/user';

export interface CreatedUserDTO {
  id: string;
  email: string;
}
class UserRepository implements IUsersRepository {
  private userRepository: Repository<Users>;

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

  public async create(data: CreateUserDTO): Promise<CreatedUserDTO> {
    const user = await this.userRepository.create(data);

    await this.userRepository.save(user);
    const createdUser = {
      email: user.email,
      id: user.id,
    };
    return createdUser;
  }

  public async delete(user: Users): Promise<Users> {
    await this.userRepository.createQueryBuilder()
      .delete()
      .from(Users)
      .where('id =:id', { id: user.id })
      .execute();
    return user;
  }

  public async save(user: Users): Promise<void> {
    await this.userRepository.save(user);
  }

  public async getUserProfile(id: string): Promise<UserProfile> {
    const user = await this.findById(id);

    const userProfile = {
      name: user?.name,
      email: user?.email,
      petPreference: user?.petPreference,
      admin: user?.admin,
      avatar: user?.avatar,
    };

    return userProfile;
  }
}

export default UserRepository;
