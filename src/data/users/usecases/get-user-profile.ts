import { UserProfile } from '../../../domain/user/dtos/UserProfile';
import IUsersRepository from '../../protocols/user-repository';

class GetUserProfileUseCase {
  private readonly repository: IUsersRepository;

  constructor(repository: IUsersRepository) {
    this.repository = repository;
  }

  public async getProfile(userId: string): Promise<UserProfile> {
    const profile = await this.repository.getUserProfile(userId);
    return profile;
  }
}

export default GetUserProfileUseCase;
