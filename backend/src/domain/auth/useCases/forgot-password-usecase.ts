export interface ForgotPassword {
   forgot(email: string): Promise<string>
}
