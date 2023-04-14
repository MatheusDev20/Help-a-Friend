export interface ResetPassword {
    reset(token: string, newPassword: string): Promise<string>
 }
