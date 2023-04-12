export interface ForgotPasswordDTO {
    jwt: string;
    userEmail: string;
}
export interface ForgotPasswordResponse {
    messageId: string;
    tokenExpiration: string;
}
