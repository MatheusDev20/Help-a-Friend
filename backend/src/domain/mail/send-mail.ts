export interface MailResponse {
    response: string;
    messageId: string;
}
export interface MailOptions {
    type: string;
    to: string;
    subject: string;
    userName: string;
    data: any
}

export interface MailService {
    send(options: MailOptions): Promise<MailResponse>
}
