import User from '../Infra/typeorm/entities/User';
import CreateUserDTO from '../dto/CreateUserDTO';

interface IUsersRepositoriy {
    findByEmail(email: string): Promise<User | undefined>;
    findById(id: string): Promise<User | undefined>;
    create(data: CreateUserDTO): Promise<User>;
    save(user: User): Promise<User>;
}

export default IUsersRepositoriy;
