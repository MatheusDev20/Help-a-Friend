import { Repository } from 'typeorm';
import { source } from '../../helpers/postgres-conn-helper';
import { UpdatedUser } from '../../../../domain/user/dtos/UpdatedUser';
/* eslint-disable dot-notation */
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
    this.userRepository = source.getRepository(Users);
  }

  public async findByEmail(email: string): Promise<Users | null> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async findById(id: string): Promise<Users | null> {
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

  // eslint-disable-next-line consistent-return
  public async update(property: string, value: any, id: string): Promise<UpdatedUser | undefined> {
    try {
      const userToBeUpdated = await this.findById(id);
      if (!userToBeUpdated) {
        throw new Error('No user found to update');
      }

      const updatedUser = {
        ...userToBeUpdated,
        [property]: value,
      };
      const response = await this.userRepository.save(updatedUser);
      return {
        userId: response.id,
        updated_at: response.updated_at,
      };
    } catch (err) {
      console.log(err);
    }
  }
}

export default UserRepository;
