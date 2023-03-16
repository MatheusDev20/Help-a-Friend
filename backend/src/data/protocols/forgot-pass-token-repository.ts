import { ForgotPasswordDTO } from '../../domain/auth/dtos/forgot-password-dto';

export interface IForgotTokenRepository {
    save(data: ForgotPasswordDTO): Promise<void>
}
