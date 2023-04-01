export interface ForgotPasswordDTO {
    jwt: string;
    userEmail: string;
}
export interface ForgotPasswordResponse {
    messageId: string;
    response: string;
    tokenExpiration: string;
}
