import { ForgotPasswordResponse } from '../dtos/forgot-password-dto';

export interface ForgotPassword {
   forgot(email: string): Promise<ForgotPasswordResponse>
}
