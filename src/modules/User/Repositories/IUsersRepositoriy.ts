import User from '../Infra/typeorm/entities/User';
import CreateUserDTO from '../Dto/CreateUserDTO';

interface IUsersRepositoriy {
    findByEmail(email: string): Promise<User | undefined>;
    findById(id: string): Promise<User | undefined>;
    getAllUsers(): Promise<User[]> | undefined
    create(data: CreateUserDTO): Promise<User>;
}

export default IUsersRepositoriy;
