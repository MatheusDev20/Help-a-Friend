export interface MailResponse {
    response: string;
    messageId: string;
}

export interface MailService {
    send(text: string, mail: string): Promise<MailResponse>
}
