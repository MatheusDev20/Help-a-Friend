export interface ResetPassword {
    reset(token: string): Promise<string>
 }
